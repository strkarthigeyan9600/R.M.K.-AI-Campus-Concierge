# RMK Campus — College Navigation Companion

A responsive campus visitor interface built with React, TypeScript and Vite. The main dashboard brings together campus search, illustrated walking routes, a campus knowledge assistant, faculty directory, transport schedules, hostel information, admissions, events, visitor guidance and an About page.

## Run locally

```sh
npm install
npm run dev:frontend -- --host 0.0.0.0
```

Open http://localhost:3000. The interface runs without the optional Express server. For the existing API scaffold, use `npm run dev` to launch both servers.

```sh
npm test
npm run build
npm run preview -- --host 0.0.0.0
```

## Completed interface flows

- Destination search matches building names, departments and facilities.
- Campus shortcuts and assistant navigation open the campus map and synchronise supported destinations with the illustrated map.
- Routes start at the actual main gate; all graph destinations have automated reachability checks. The routing service retains accessible graph filtering, but the illustrated map requires campus verification of accessible paths.
- A destination selector covers all buildings. Destinations absent from the illustration display a concise location summary. Walking directions sit beside the map and never cover buildings. Start and destination are both selectable, can be swapped, and stay synchronised between the route toolbar and map. QR handoff preserves both endpoints through `?from=NODE_ID&to=NODE_ID`.
- QR codes use the actual application address and preserve the destination through `?to=NODE_ID`. A phone must be able to reach that address; localhost QR codes cannot open a different computer's localhost.
- Events have upcoming/past filters, venue directions and downloadable `.ics` calendar files. Calendar entries include the listed time in the description, and are saved as all-day events.
- Faculty department filters are derived from the actual records. Generic stock portraits have been replaced with initials.
- Transport explicitly shows sample schedules, without pretending to be GPS tracking.
- Voice uses browser speech recognition when available, reports unsupported/permission failures, and stops actual recognition when cancelled.
- Administration provides searchable data review and JSON export for the college handover. It is a public local review screen, not a protected production CMS.
- Emergency information offers a phone dialler link to India's 112 helpline and directions to the health centre. It does not claim to dispatch security. Source: https://112.gov.in/.

## Before the college's public launch

This is a completed presentation interface, not an integrated college operations system. Existing records and photos were supplied in the project and have not been authenticated with the college.

1. Have the college approve building positions, facilities, faculty records, office hours, hostel policies, admissions information, contacts and event dates in `src/data/mockData.ts` and `src/services/ragEngine.ts`.
2. Replace supplied imagery with approved college photographs. The illustrated map and graph contain different schematic layouts; distances are estimates. Verify physical accessibility before offering accessible directions to visitors. The incomplete indoor schematic has been removed from the interface.
3. Host the built `dist` directory on an HTTPS college domain. This makes mobile QR handoff and supported microphone access practical. The host should serve `index.html` for the application root, including query strings, and include `/assets/` and `/rmk_campus_router.html`.
4. If the college needs secure administration, real-time buses, event registration, operational analytics or data editing, implement authenticated backend services and connect them to the interface. The existing Express scaffold is not a production authentication or tracking service.
5. The assistant retrieves matching campus records locally. It is not connected to a hosted language model, and selecting a language does not fully translate the campus dataset.

## Validation

`npm test` covers campus knowledge retrieval, accessible routes, invalid destinations and main-gate reachability for every graph node. `npm run build` runs TypeScript checks and creates the production bundle. Desktop and mobile layouts, search-to-map navigation, assistant prompts, events, administration and QR route loading are also checked in the browser.
