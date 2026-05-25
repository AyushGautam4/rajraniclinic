# Image Guide

All website images now load directly from `frontend/public/images/...`.

If you want to replace an image:
1. Put your new file in the same folder.
2. Keep the same filename if you want zero code change.
3. Refresh the browser.

## About + Home

- Home hero and About hero: `frontend/public/images/about/hospital-main.jpg`
- About "Why families choose us":
  - `frontend/public/images/about/trust-01.jpg`
  - `frontend/public/images/about/trust-02.jpg`
  - `frontend/public/images/about/hospital-main.jpg`
- About "Our direction":
  - `frontend/public/images/about/story-01.jpg`
  - `frontend/public/images/about/story-02.jpg`
  - `frontend/public/images/about/story-03.jpg`
- About "Our values":
  - `frontend/public/images/about/value-01.jpg`
  - `frontend/public/images/about/trust-01.jpg`
  - `frontend/public/images/about/story-02.jpg`
  - `frontend/public/images/about/story-03.jpg`

## Services

- Emergency: `frontend/public/images/services/service-emergency.jpg`
- Surgery: `frontend/public/images/services/service-surgery.jpg`
- Orthopedics: `frontend/public/images/services/service-ortho.jpg`
- X-Ray: `frontend/public/images/services/service-xray.jpg`

Some service cards also reuse About images from `frontend/public/images/about/`.

## Doctors

- Doctor 1: `frontend/public/images/doctors/doctor-01.jpg`
- Doctor 2: `frontend/public/images/doctors/doctor-02.jpg`
- Doctor 3: `frontend/public/images/doctors/doctor-03.jpg`
- Doctor 4: `frontend/public/images/doctors/doctor-04.jpg`
- Doctor 5: `frontend/public/images/doctors/doctor-05.jpg`
- Doctor 6: `frontend/public/images/doctors/doctor-06.jpg`

## If You Want New Filenames

Update the image path in these files:

- `frontend/src/mockData.js`
- `frontend/src/pages/Home.jsx`
- `frontend/src/pages/AboutPage.jsx`
- `frontend/src/components/FlipInfoCard.jsx`
