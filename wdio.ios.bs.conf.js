const { join } = require('path')
const allure = require('allure-commandline')
const video = require('wdio-video-reporter');

exports.config = {
    // hostname: 'localhost',
    // port: 4723,
    path: '/wd/hub',
    user: "gabrielroquim_j2H5F4",
    key: "ZV6tSgzyw2ytsxvpUyRF",

    // services: ['appium'],
    services: ['browserstack'],
    specs: [
        './test/specs/**/*.spec.js'
    ],
    suites: {
        products: [
            './test/specs/products.spec.js'
        ]
    },
    framework: 'mocha',
    capabilities: [
    {
        project: "Meu primeiro projeto Appium iOS BS",
        build: 'EBAC Test',
        name: 'ebac_test_IOS',
        device: 'iPhone 12 Pro',
        os_version: "14",
        'browserstack.debug': true,
        app: "bs://693b4dd0b0c29a24cdd9d2fe95247c625006552f"
    }
        // {
        //     "platformName": "iOS",
        //     "deviceName": "iPhone 13",
        //     "platformVersion": "15.2",
        //     "orientation": "PORTRAIT",
        //     "automationName": "XCUITest",
        //     "app": join(process.cwd(), './app/ios/loja-ebac.app'),
        //     'newCommandTimeout': 240
        //   }
    ],
    waitforTimeout: 20000,
    mochaOpts: {
        timeout: 300000
    },
    reporters: ['spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        }],
        [video, {
            saveAllVideos: true,       // If true, also saves videos for successful test cases
            videoSlowdownMultiplier: 50, // Higher to get slower videos, lower for faster videos [Value 1-100]
        }]
    ],
    onComplete: function () {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function (exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    },
    afterStep: function (test, scenario, { error, duration, passed }) {
        if(error) {
            driver.takeScreenshot()
        }
    }
}