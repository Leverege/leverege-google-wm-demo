# Google Waste Management Demo

## Getting Started

This repository contains a set of tools for quickly building, deploying, and running the Google Waste Management demo in Kubernetes (with Helm).

Since markdown does not support opening a new tab from a link, all of the links that are clicked through from this page will open the link from within this tab. To avoid this and have a new tab from each link simply hold the shift key down before clicking the link.

## Prerequisites

Before running the setup script, you will need to install some local deployment tools, configure your Firebase and GCP projects, and gather your API keys.

### Local Installs

We start by installing NodeJS, the Google Cloud SDK, Firebase CLI, Kubernetes CLI and helm in order to get the command line tools necessary to deploy the Waste Management system.

On MacOS, using brew:

```
brew install node@8
brew cask install google-cloud-sdk
brew install kubernetes-cli
brew install firebase-cli
brew install kubernetes-helm
```

For other operating systems:

* [Install NodeJS](https://nodejs.org/en/download)
* [Install Google Cloud SDK (gcloud)](https://cloud.google.com/sdk/install)
* [Install Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl)
* [Install Helm](https://docs.helm.sh/using_helm/#installing-helm)
* [Install Firebase CLI](https://github.com/firebase/firebase-tools#installation)

### Create and Configure a New Firebase Project

[Creating a new Firebase project](https://console.firebase.google.com/). Creating a Firebase project will also create a linked Google Cloud Project of the same name.

### Google maps

* [Get a Google maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key)

---

## Setup and Deployment

### Clone repo

Clone this repo

    git clone [INSERT REPO LINK] && cd [INSERT DIR]

### Add service account credentials and configure its roles

1. Create the Service Account

    * [Open the IAM & admin page](https://console.cloud.google.com/iam-admin/serviceaccounts)
    * Select **+ Create Service Account** at the top
    * Give it a name (e.g. wm-demo)

2. Add the following project roles:

    * Cloud IoT > Cloud IoT Admin
    * Other > Firebase Rules System
    * Pub/Sub > Pub/Sub Admin
    * BigQuery > BigQuery Admin

3. Check **Furnish a new private key** and, leave key type as "JSON"

4. Click **Save** and download the file to this repo's `scripts/platform-secrets/` folder.

### Add your Google Maps API key to the environment variable

Open the `scripts/platform-secrets/fontend-env` file with a text editor. In that file, replace the phrase `GOOGLE_MAPS_API_KEY` with your Google Maps API key (keeping the quotes).

The file should look like this before you add your key:

```javascript
Blue.start({
  devices: {
    root: 'data/google-asset-tracking',
    firestore: 'FIRESTORE_CONFIG',
  },
  sim: {
    host: '/sim',
  },
  pubsub: {
    host: '/pubsub',
  },
  keys: {
    mapsKey: 'GOOGLE_MAPS_API_KEY',
  },
});
```

Save the `scripts/platform-secrets/fontend-env` file.

### Run the deployment script

Run:
  `./scripts/Build_Google_Waste_Management`

This script will provision a Kubernetes cluster and deploy all project services. You can customize the enviroment variables on the `values.yaml` file.

When the script starts, it will launch a browser and prompt you to log into your GCP account. Log in, and click **allow**. Then, return to the console and enter your project's id.

---

## Teardown cluster and resources

To delete remove the service from the cluster using Helm, delete the Kubernetes cluster and empty IoT Core Registry, run:
  `./scripts/TearItDown`

---

## Built With

* [Helm - The Kubernetes Package Manager](https://helm.sh/)
* [Kubernetes - The Docker Container Manager](https://kubernetes.io/)
* [Docker - The MicroService Manager](https://www.docker.com/)
