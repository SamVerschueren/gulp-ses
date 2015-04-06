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

var sesOptions = {
    accessKeyId: undefined,
    secretAccessKey: undefined,
    region: 'us-east-1'
};

// Export the plugin
module.exports = function(options) {

    // First take the credentials that are set by the setters, if those are not defined, take
    // the credentials in the options.
    sesOptions.accessKeyId = sesOptions.accessKeyId || options.accessKeyId;
    sesOptions.secretAccessKey = sesOptions.secretAccessKey || options.secretAccessKey;
    sesOptions.region = sesOptions.region || options.region;

    var attachments = [],
        transporter = nodemailer.createTransport(ses({
            accessKeyId: sesOptions.accessKeyId,
            secretAccessKey: sesOptions.secretAccessKey,
            region: sesOptions.region
        }));

    return through.obj(function(file, enc, cb) {
        if(sesOptions.accessKeyId === undefined) {
            // Return an error if no accessKeyId is specified
            cb(new gutil.PluginError('gulp-ses', 'Please provide an access key ID.'));
        }

        if(sesOptions.secretAccessKey === undefined) {
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
        // Remove the options that can't be set from the outside
        delete options.accessKeyId;
        delete options.secretAccessKey;
        delete options.region;
        delete options.attachments;

        if(attachments.length > 0) {
            // Set the attachments
            options.attachments = attachments;
        }

        // Send the mail
        transporter.sendMail(options, function(err) {
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
    sesOptions.accessKeyId = accessKeyId;
};

/**
 * Sets the Amazon secret access key that is used to authorize with AWS.
 *
 * @param {String} secretAccessKey The AWS secret access key
 */
module.exports.setSecretAccessKey = function(secretAccessKey) {
    sesOptions.secretAccessKey = secretAccessKey;
};

/**
 * Specify the region to send the service request to. Default to <em>us-east-1</em>.
 *
 * @param {String} region The region to send the requests to.
 */
module.exports.setRegion = function(region) {
    sesOptions.region = region;
};
