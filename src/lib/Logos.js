import legendary from "../assets/images/logos/Legendary_Symbol.webp";
import biotic from "../assets/images/logos/Ti_icons_biotic.webp"
import cybernetic from "../assets/images/logos/Ti_icons_cybernetic.webp"
import propulsion from "../assets/images/logos/Ti_icons_propulsion.webp"
import warfare from "../assets/images/logos/Ti_icons_warfare.webp"

// factions
import hacan from "../assets/images/logos/Hacan.webp";
import arborec from "../assets/images/logos/Arborec.webp";
import empyrean from "../assets/images/logos/EmpyreanFactionSymbol.webp";
import jolnar from "../assets/images/logos/Jol-Nar.webp";

const logos = {
    legendary,
    biotic,
    cybernetic,
    propulsion,
    warfare,
    hacan,
    arborec,
    empyrean,
    jolnar
};

function GetLogoByKey(key) {
    return logos[key]
}

export default GetLogoByKey;