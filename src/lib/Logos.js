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
import sardakk from "../assets/images/logos/Sardakk.webp";

// leaders
import arborecAgent from "../assets/images/logos/ArborecAgentP.webp";
import arborecCommander from "../assets/images/logos/ArborecCommanderP.webp";
import arborecHero from "../assets/images/logos/ArborecHeroP.webp";
import hacanAgent from "../assets/images/logos/HacanAgentP.webp";
import hacanCommander from "../assets/images/logos/HacanCommanderP.webp";
import hacanHero from "../assets/images/logos/HacanHeroP.webp";
import empyreanAgent from "../assets/images/logos/EmpyreanAgentP.webp";
import empyreanCommander from "../assets/images/logos/EmpyreanCommanderP.webp";
import empyreanHero from "../assets/images/logos/EmpyreanHeroP.webp";
import jolnarAgent from "../assets/images/logos/JolNarAgentP.webp";
import jolnarCommander from "../assets/images/logos/JolNarCommanderP.webp";
import jolnarHero from "../assets/images/logos/JolNarHeroP.webp";
import muaatAgent from "../assets/images/logos/MuaatAgentP.webp";
import muaatCommander from "../assets/images/logos/MuaatCommanderP.webp";
import muaatHero from "../assets/images/logos/MuaatHeroP.webp";
import nomadAgent1 from "../assets/images/logos/NomadAgent1P.webp";
import nomadAgent2 from "../assets/images/logos/NomadAgent2P.webp";
import nomadAgent3 from "../assets/images/logos/NomadAgent3P.webp";
import nomadCommander from "../assets/images/logos/NomadCommanderP.webp";
import nomadHero from "../assets/images/logos/NomadHeroP.webp";
import sardakkAgent from "../assets/images/logos/SardakkAgentP.webp";
import sardakkCommander from "../assets/images/logos/SardakkCommanderP.webp";
import sardakkHero from "../assets/images/logos/SardakkHeroP.webp";

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
    sardakk,
    arborecAgent,
    arborecCommander,
    arborecHero,
    hacanAgent,
    hacanCommander,
    hacanHero,
    empyreanAgent,
    empyreanCommander,
    empyreanHero,
    jolnarAgent,
    jolnarCommander,
    jolnarHero,
    muaatAgent,
    muaatCommander,
    muaatHero,
    nomadAgent1,
    nomadAgent2,
    nomadAgent3,
    nomadCommander,
    nomadHero,
    sardakkAgent,
    sardakkCommander,
    sardakkHero,
};

function GetLogoByKey(key) {
    return logos[key];
}

export default GetLogoByKey;
