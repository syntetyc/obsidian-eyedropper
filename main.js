/*
  Obsidian Color Picker (Eyedropper)
  */
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => ColorPickerPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  outputFormat: "hex",
  uppercaseHex: true,
  includeAlpha: false,
  defaultAlpha: 1,
  copyToClipboard: true,
  spaceAfter: false,
  showColorPreview: true
};
function hexToRgb(hex) {
  const m = hex.replace("#", "").trim();
  if (!/^[0-9a-fA-F]{6}$/.test(m)) return null;
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  return { r, g, b };
}
function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}
function formatHex(hex, uppercase) {
  const clean = hex.startsWith("#") ? hex : `#${hex}`;
  return uppercase ? clean.toUpperCase() : clean.toLowerCase();
}
function formatRgbaFromHex(hex, alpha) {
  const rgb = hexToRgb(hex);
  if (!rgb) return "";
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Number(alpha.toFixed(3))})`;
}
async function getColorViaEyeDropper() {
  const anyWindow = window;
  if (anyWindow.EyeDropper) {
    const eyeDropper = new anyWindow.EyeDropper();
    const result = await eyeDropper.open();
    return result?.sRGBHex ?? null;
  }
  return null;
}
async function getColorViaInputFallback() {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "color";
    input.style.position = "fixed";
    input.style.left = "-9999px";
    document.body.appendChild(input);
    input.addEventListener("input", () => {
      const val = input.value;
      input.remove();
      resolve(val || null);
    });
    input.click();
  });
}
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    new import_obsidian.Notice("Color copied to clipboard");
  } catch {
  }
}
var ColorPickerPlugin = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.settings = { ...DEFAULT_SETTINGS };
  }
  async onload() {
    await this.loadSettings();
    this.addCommand({
      id: "pick-color",
      name: "Pick color\u2026",
      editorCallback: async (editor, view) => {
        await this.pickAndInsert(editor);
      }
      // Sugerencia de atajo: Cmd/Ctrl+Shift+C (configurable en Obsidian)
    });
    const ribbon = this.addRibbonIcon("palette", "Pick color\u2026", async () => {
      const editor = this.getActiveEditor();
      if (!editor) {
        new import_obsidian.Notice("Open a note to insert the color");
        return;
      }
      await this.pickAndInsert(editor);
    });
    ribbon.addClass("colorpicker-ribbon");
    this.addSettingTab(new ColorPickerSettingTab(this.app, this));
  }
  onunload() {
  }
  getActiveEditor() {
    const mdView = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
    return mdView?.editor ?? null;
  }
  buildOutput(hex) {
    const { outputFormat, uppercaseHex, includeAlpha, defaultAlpha, spaceAfter, showColorPreview } = this.settings;
    const HEX = formatHex(hex, uppercaseHex);
    const alpha = includeAlpha ? clamp01(defaultAlpha) : 1;
    const RGBA = formatRgbaFromHex(HEX, alpha);
    const colorPreview = showColorPreview ? `<span class="color-preview" style="background-color: ${HEX};"></span>` : "";
    let out = "";
    if (outputFormat === "hex") out = `${colorPreview}\`${HEX}\``;
    else if (outputFormat === "rgba") out = `${colorPreview}${RGBA}`;
    else out = `${colorPreview}\`${HEX}\` (${RGBA})`;
    if (spaceAfter) out += " ";
    return out;
  }
  async pickAndInsert(editor) {
    let hex = await getColorViaEyeDropper();
    if (!hex) {
      new import_obsidian.Notice("EyeDropper not available. Opening fallback color picker\u2026");
      hex = await getColorViaInputFallback();
      if (!hex) {
        new import_obsidian.Notice("No color selected");
        return;
      }
    }
    const output = this.buildOutput(hex);
    const sel = editor.getSelection();
    if (sel && sel.length > 0) {
      editor.replaceSelection(output);
    } else {
      const cursor = editor.getCursor();
      editor.replaceRange(output, cursor);
    }
    if (this.settings.copyToClipboard) {
      await copyToClipboard(output.trim());
    }
  }
  async loadSettings() {
    const loaded = await this.loadData();
    this.settings = Object.assign({}, DEFAULT_SETTINGS, loaded);
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var ColorPickerSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Color Picker (Eyedropper)" }).addClass("colorpicker-setting");
    new import_obsidian.Setting(containerEl).setName("Output format").setDesc("Format used when inserting the color").addDropdown(
      (dd) => dd.addOption("hex", "HEX (#RRGGBB)").addOption("rgba", "RGBA (rgba(r,g,b,a))").addOption("both", "Both (HEX + RGBA)").setValue(this.plugin.settings.outputFormat).onChange(async (v) => {
        this.plugin.settings.outputFormat = v;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Uppercase HEX").setDesc("Use uppercase letters in HEX format").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.uppercaseHex).onChange(async (value) => {
        this.plugin.settings.uppercaseHex = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Include alpha channel").setDesc("Include transparency in RGBA format").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.includeAlpha).onChange(async (value) => {
        this.plugin.settings.includeAlpha = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Default alpha").setDesc("Default transparency value (0.0 to 1.0)").addSlider(
      (slider) => slider.setLimits(0, 1, 0.1).setValue(this.plugin.settings.defaultAlpha).setDynamicTooltip().onChange(async (value) => {
        this.plugin.settings.defaultAlpha = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Copy to clipboard").setDesc("Automatically copy color to clipboard when picked").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.copyToClipboard).onChange(async (value) => {
        this.plugin.settings.copyToClipboard = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Space after").setDesc("Add space after color when inserting").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.spaceAfter).onChange(async (value) => {
        this.plugin.settings.spaceAfter = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Hide color preview").setDesc("Hide the color preview circle next to the color code").addToggle(
      (toggle) => toggle.setValue(!this.plugin.settings.showColorPreview).onChange(async (value) => {
        this.plugin.settings.showColorPreview = !value;
        await this.plugin.saveSettings();
      })
    );
  }
};
//# sourceMappingURL=main.js.map
