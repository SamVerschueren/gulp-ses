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

// Export the plugin
module.exports = function(options) {

    // TODO try to pass AWS credentials via setters instead of via the options
    var attachments = [],
        transporter = nodemailer.createTransport(ses({
            accessKeyId: options.accessKeyId,
            secretAccessKey: options.secretAccessKey
        }));

    return through.obj(function(file, enc, cb) {
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
