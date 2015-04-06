# gulp-ses

> Send emails with Amazon SES by using [nodemailer](https://github.com/andris9/Nodemailer).

# Installation

> Not yet available

```bash
npm install --save-dev gulp-ses
```

# Usage

For sending email through ```SES```, you'll have to authorize by providing an access key ID and a secret access key.

```
var mail = require('gulp-ses');

mail.setAccessKeyId('accessKeyId');
mail.setSecretAccessKey('secretAccessKey');
```

If you are in a different region then ```us-east-1```, you'll have to specify the region as well.

```
mail.setRegion('eu-west-1');
```

If the mail is configured, you can start sending emails with attachments.

```JavaScript
var gulp = require('gulp'),
    mail = require('gulp-ses');

gulp.task('mail', function() {
    // Set AWS credentials
    mail.setAccessKeyId('accessKeyID');
    mail.setSecretAccessKey('secretAccessKey');
    mail.setRegion('eu-west-1');

    // Send the mail
    return gulp.src('doc.pdf')
        .pipe(mail({
            from: 'sender@company.com',
            to: 'recipient@company.com',
            subject: 'Subject of the email',
            text: 'Body of the email'
        }));
});
```

This will send an email with ```doc.pdf``` attached as attachment.

### Options

The following are the possible fields of an e-mail message:

  - **from** - The e-mail address of the sender. All e-mail addresses can be plain `'sender@server.com'` or formatted `'Sender Name <sender@server.com>'`, see [here](#address-formatting) for details
  - **sender** - An e-mail address that will appear on the *Sender:* field
  - **to** - Comma separated list or an array of recipients e-mail addresses that will appear on the *To:* field
  - **cc** - Comma separated list or an array of recipients e-mail addresses that will appear on the *Cc:* field
  - **bcc** - Comma separated list or an array of recipients e-mail addresses that will appear on the *Bcc:* field
  - **replyTo** - An e-mail address that will appear on the *Reply-To:* field
  - **inReplyTo** - The message-id this message is replying
  - **references** - Message-id list (an array or space separated string)
  - **subject** - The subject of the e-mail
  - **text** - The plaintext version of the message as an Unicode string, Buffer, Stream or an object *{path: '...'}*
  - **html** - The HTML version of the message as an Unicode string, Buffer, Stream or an object *{path: '...'}*
  - **headers** - An object or array of additional header fields (e.g. *{"X-Key-Name": "key value"}* or *[{key: "X-Key-Name", value: "val1"}, {key: "X-Key-Name", value: "val2"}]*)
  - **alternatives** - An array of alternative text contents (in addition to text and html parts)  (see [nodemailer/alternatives](https://github.com/andris9/Nodemailer#alternatives) for details)
  - **messageId** - optional Message-Id value, random value will be generated if not set
  - **date** - optional Date value, current UTC string will be used if not set
  - **encoding** - optional transfer encoding for the textual parts (defaults to 'quoted-printable')

All text fields (e-mail addresses, plaintext body, html body) use UTF-8 as the encoding.

## Zip multiple files

If you have to send lots of files, you can easily use [gulp-zip](https://github.com/sindresorhus/gulp-zip) to zip all the source
files and send the zip file as attachment.

```JavaScript
var zip = require('gulp-zip');

gulp.task('mail', function() {
    // Send the mail
    return gulp.src('doc/**/*')
        .pipe(zip('documentation.zip'))
        .pipe(mail({
            from: 'sender@company.com',
            to: 'recipient@company.com',
            subject: 'Documentation',
            text: 'You can find the documentation in the attachment'
        }));
});
```

# Contributors

- Sam Verschueren (Author) [<sam.verschueren@gmail.com>]

# License (MIT)
Copyright (c) 2015 Sam Verschueren <sam.verschueren@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
