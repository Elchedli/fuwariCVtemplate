import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { LinkPreset, type NavBarLink } from "@/types/config";

export const LinkPresets: { [key in LinkPreset]: NavBarLink } = {
	[LinkPreset.Archive]: {
		name: i18n(I18nKey.archive),
		url: "/archive/",
	},
	[LinkPreset.Experience]: {
		name: i18n(I18nKey.experience),
		url: "/experiences/",
	},
	[LinkPreset.Project]: {
		name: i18n(I18nKey.project),
		url: "/projects/",
	},
	[LinkPreset.Achievement]: {
		name: i18n(I18nKey.achievement),
		url: "/achievements/",
	},
};
