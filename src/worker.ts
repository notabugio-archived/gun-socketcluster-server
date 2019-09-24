const SCWorker = require("socketcluster/scworker")
const express = require("express")
const serveStatic = require("serve-static")
const Path = require("path")
const morgan = require("morgan")
const healthChecker = require("sc-framework-health-check")

class Worker extends SCWorker {
  run() {
    console.log("   >> Worker PID:", process.pid)
    const environment = this.options.environment

    const app = express()

    const httpServer = this.httpServer
    //const scServer = this.scServer

    if (environment === "dev") {
      // Log every HTTP request.
      // See https://github.com/expressjs/morgan for other available formats.
      app.use(morgan("dev"))
    }
    app.use(serveStatic(Path.resolve(__dirname, "public")))

    // Listen for HTTP GET "/health-check".
    healthChecker.attach(this, app)

    httpServer.on("request", app)

    /**
     * NOTE: Be sure to replace the following sample logic with your own logic.
     */

    /**
    const count = 0;
    // Handle incoming websocket connections and listen for events.
    scServer.on('connection', function (socket) {

      socket.on('sampleClientEvent', function (data) {
        count++;
        console.log('Handled sampleClientEvent', data);
        scServer.exchange.publish('sample', count);
      });

      const interval = setInterval(function () {
        socket.emit('random', {
          number: Math.floor(Math.random() * 5)
        });
      }, 1000);

      socket.on('disconnect', function () {
        clearInterval(interval);
      });

    });
    */
  }
}

new Worker()
