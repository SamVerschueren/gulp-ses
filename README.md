# gulp-ses

> Send emails with Amazon Simple Email Service

# Installation

> Not yet available

```bash
npm install gulp-ses
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
