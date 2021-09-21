// technology
import legendary from "../assets/images/logos/Legendary_Symbol.webp";
import biotic from "../assets/images/logos/Ti_icons_biotic.webp";
import cybernetic from "../assets/images/logos/Ti_icons_cybernetic.webp";
import propulsion from "../assets/images/logos/Ti_icons_propulsion.webp";
import warfare from "../assets/images/logos/Ti_icons_warfare.webp";

// units
import carrier from "../assets/images/logos/Carrier_Plastic.webp";
import cruiser from "../assets/images/logos/Cruiser_Plastic.webp";
import destroyer from "../assets/images/logos/Destroyer_Plastic.webp";
import dreadnought from "../assets/images/logos/Dreadnought_Plastic.webp";
import fighter from "../assets/images/logos/Fighter_Plastic.webp";
import flagship from "../assets/images/logos/Flagship_Plastic.webp";
import infantry from "../assets/images/logos/Infantry_Plastic.webp";
import mech from "../assets/images/logos/Mech_Plastic.webp";
import pds from "../assets/images/logos/PDS_Plastic.webp";
import spaceDock from "../assets/images/logos/Space_Dock_Plastic.webp";
import warSun from "../assets/images/logos/War_Sun_Plastic.webp";

// factions
import hacan from "../assets/images/logos/Hacan.webp";
import arborec from "../assets/images/logos/Arborec.webp";
import empyrean from "../assets/images/logos/EmpyreanFactionSymbol.webp";
import jolnar from "../assets/images/logos/Jol-Nar.webp";
import muaat from "../assets/images/logos/Muaat.webp";
import nomad from "../assets/images/logos/Nomad.webp";

export const logos = {
    legendary,
    biotic,
    cybernetic,
    propulsion,
    warfare,
    carrier,
    cruiser,
    destroyer,
    dreadnought,
    fighter,
    flagship,
    infantry,
    mech,
    pds,
    spaceDock,
    warSun,
    hacan,
    arborec,
    empyrean,
    jolnar,
    muaat,
    nomad,
};

function GetLogoByKey(key) {
    return logos[key];
}

export default GetLogoByKey;
