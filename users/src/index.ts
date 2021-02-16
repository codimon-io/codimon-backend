// import debugAgent from "@google-cloud/debug-agent";
// debugAgent.start({serviceContext: {enableCanary: true}});

import { ExpressApp } from "./frameworks/express/ExpressApp";

const app = new ExpressApp();

app.Start();