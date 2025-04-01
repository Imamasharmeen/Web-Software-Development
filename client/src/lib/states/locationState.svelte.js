import { browser } from "$app/environment";

const LOCATION_KEY = "location";
let initialLocation = { x: 0, y: 0 };
if (browser && localStorage.hasOwnProperty(LOCATION_KEY)) {
  initialLocation = JSON.parse(localStorage.getItem(LOCATION_KEY));
}

let locationState = $state(initialLocation);

const saveLocation = () => {
  if (browser) {
    localStorage.setItem(LOCATION_KEY, JSON.stringify(locationState));
  }
};

const useLocationState = () => {
  return {
    get location() {
      return locationState;
    },
    up: () => {
      locationState.y++;
      saveLocation();
    },
    down: () => {
      locationState.y--;
      saveLocation();
    },
    left: () => {
      locationState.x--;
      saveLocation();
    },
    right: () => {
      locationState.x++;
      saveLocation();
    },
  };
};

export { useLocationState };