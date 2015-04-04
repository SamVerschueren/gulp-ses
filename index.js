'use strict';

/**
 * This gulp plugin sends emails via Amazon Simple Email Service.
 *
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  30 Mar. 2015
 */

// module dependencies
var path = require('path'),
    through = require('through2'),
    gutil = require('gulp-util'),
    nodemailer = require('nodemailer'),
    ses = require('nodemailer-ses-transport');

var credentials = {
    accessKeyId: undefined,
    secretAccessKey: undefined
};

// Export the plugin
module.exports = function(options) {

    // First take the credentials that are set by the setters, if those are not defined, take
    // the credentials in the options.
    credentials.accessKeyId = credentials.accessKeyId || options.accessKeyId;
    credentials.secretAccessKey = credentials.secretAccessKey || options.secretAccessKey;

    var attachments = [],
        transporter = nodemailer.createTransport(ses({
            accessKeyId: credentials.accessKeyId,
            secretAccessKey: credentials.secretAccessKey
        }));

    return through.obj(function(file, enc, cb) {
        if(credentials.accessKeyId === undefined) {
            // Return an error if no accessKeyId is specified
            cb(new gutil.PluginError('gulp-ses', 'Please provide an access key ID.'));
        }

        if(credentials.secretAccessKey === undefined) {
            // Return an error if no secretAccessKey is specified
            cb(new gutil.PluginError('gulp-ses', 'Please provide a secret access key'));
        }

        if(file.isDirectory()) {
            // Directories are not supported. They should be zipped first.
            cb(new gutil.PluginError('gulp-ses', 'Directories not supported. Please zip the directory first before mailing it.'));
        }

        // Add the attachment to the attachments array
        attachments.push({
            filename: path.basename(file.path),
            content: file.contents
        });

        cb(null, file);
    }, function(cb) {
        // TODO check options

        var mailOptions = {
            from: options.from,
            to: options.to,
            subject: options.subject,
            text: options.text,
            attachments: attachments
        };

        // Send the mail
        transporter.sendMail(mailOptions, function(err) {
            cb(err);
        });
    });
};

/**
 * Sets the Amazon access key ID that is used to authorize with AWS.
 *
 * @param {String} accessKeyId The AWS access key ID.
 */
module.exports.setAccessKeyId = function(accessKeyId) {
    credentials.accessKeyId = accessKeyId;
};

/**
 * Sets the Amazon secret access key that is used to authorize with AWS.
 *
 * @param {String} secretAccessKey The AWS secret access key
 */
module.exports.setSecretAccessKey = function(secretAccessKey) {
    credentials.secretAccessKey = secretAccessKey;
};
