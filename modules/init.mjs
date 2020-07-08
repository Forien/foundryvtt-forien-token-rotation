import VersionCheck from "./versioning/version-check.mjs";
import renderWelcomeScreen from "./versioning/welcome-screen.mjs";
import constants from "./constants.mjs";
import Anchor from "./anchor.mjs";

Hooks.once('init', () => {
  game.settings.register(constants.moduleName, "playersWelcomeScreen", {
    name: "ForienTokenRotation.Settings.playersWelcomeScreen.Enable",
    hint: "ForienTokenRotation.Settings.playersWelcomeScreen.EnableHint",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

  Hooks.callAll("ForienTokenRotation.afterInit");
});

Hooks.once('setup', () => {

  Hooks.callAll("ForienTokenRotation.afterSetup");
});

Hooks.once("ready", () => {
  if (VersionCheck.check(constants.moduleName)) {
    if (game.user.isGM || game.settings.get(constants.moduleName, 'playersWelcomeScreen')) {
      renderWelcomeScreen();
    }
  }

  Hooks.callAll("ForienTokenRotation.afterReady");
});

Hooks.on("renderTokenHUD", (tokenHUD, html, data) => {
  let anchor = new Anchor(data);
  let element = $(anchor.render());
  html.append(element);
  anchor.activateListeners(element);
  anchor.initialize(html, data.rotation)
});