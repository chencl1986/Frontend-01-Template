var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    /* // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag

    // This makes `appname` a required argument.
    this.argument('appname', {type: String, required: true});

    // And you can then access it later; e.g.
    this.log(this.options.appname);

    // This method adds support for a `--coffee` flag
    this.option('coffee');

    // And you can then access it later; e.g.
    this.scriptSuffix = this.options.coffee ? '.coffee' : '.js';
    this.log(this.options.coffee); */
  }

  /* method1() {
    this.log('method 1 just ran');
  }

  method2() {
    this.log('method 2 just ran');
  }

  _private_method() {
    console.log('private hey');
  } */

  /* async prompting() {
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname, // Default to current folder name
      },
      {
        type: 'confirm',
        name: 'cool',
        message: 'Would you like to enable the Cool feature?',
      },
    ]);

    this.log('app name', answers.name);
    this.log('cool feature', answers.cool);
  } */

  /* async prompting() {
    this.answers = await this.prompt([
      {
        type: 'confirm',
        name: 'cool',
        message: 'Would you like to enable the Cool feature?',
      },
    ]);
  }

  writing() {
    this.log('cool feature', this.answers.cool); // user answer `cool` used
  } */

  /* installingLodash() {
    this.npmInstall(['lodash'], {'save-dev': true});
  } */

  /* writing() {
    const pkgJson = {
      devDependencies: {
        eslint: '^3.15.0',
      },
      dependencies: {
        react: '^16.2.0',
      },
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
  }

  install() {
    this.npmInstall();
  } */

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Your project title',
      },
    ]);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      {title: this.answers.title},
    );
  }

  /* constructor(args, opts) {
    super(args, opts);
  } */
};
