const url = 'http://www.norgeskart.no/'
const urlOpenWps = 'http://openwps.statkart.no/skwms1/'
const urlOpenWms = 'http://openwms.statkart.no/skwms1/'
const urlGeonorge = 'https://ws.geonorge.no/'
const urlSeEiendom = 'http://www.seeiendom.no/'
const urlFaktaark = 'https://stadnamn.kartverket.no/fakta/'
// const urlHavnivaa = 'http://api.sehavniva.no/'

export const searchServices = {
  matrikkelVeg: query => `${url}ws/veg.py?${encodeURIComponent(query)}`,
  matrikkelAdresse: query => `${url}ws/adr.py?${encodeURIComponent(query)}`,
  matrikkelNummer: query => `${url}ws/eie.py?${encodeURIComponent(query)}`
}

export const uploadGpxFileService = () => `${url}ws/upload-gpx.py`

export const generateElevationChartServiceUrl = (gpxFile) => {
  const serviceUrl = `${urlOpenWps}wps.elevation?request=Execute&service=WPS&version=1.0.0&identifier=elevationChart&dataInputs=`
  return `${serviceUrl}[gpx=${gpxFile}] `
}

export const generateMapLinkServiceUrl = (config) => {
  const service = encodeURIComponent(config.service)
  const request = encodeURIComponent(config.request)
  const crs = encodeURIComponent(config.CRS)
  const format = encodeURIComponent(config.FORMAT)
  const bgcolor = encodeURIComponent(config.BGCOLOR)
  const transparent = encodeURIComponent(config.TRANSPARENT)
  const layers = encodeURIComponent(config.LAYERS)
  const version = encodeURIComponent(config.VERSION)
  const width = encodeURIComponent(config.WIDTH)
  const height = encodeURIComponent(config.HEIGHT)
  const bbox = encodeURIComponent(config.BBOX)

  return `${urlOpenWms}wms.topo2?service=${service}&request=${request}&CRS=${crs}&FORMAT=${format}&BGCOLOR=${bgcolor}&TRANSPARENT=${transparent
            }&LAYERS=${layers}&VERSION=${version}&WIDTH=${width}&HEIGHT=${height}&BBOX=${bbox}`
}

export const generateEmergencyPosterServiceUrl = (config) => {
  const locationName = encodeURIComponent(config.locationName)
  const position1 = encodeURIComponent(config.position1)
  const position2 = encodeURIComponent(config.position2)
  const street = encodeURIComponent(config.street)
  const place = encodeURIComponent(config.place)
  const matrikkel = encodeURIComponent(config.matrikkel)
  const utm = encodeURIComponent(config.utm)
  const posDez = encodeURIComponent(config.posDez)
  const map = encodeURIComponent(config.map)

  return `${urlGeonorge}/fop/fop?locationName=${locationName}&position1=${position1}&position2=${position2
            }&street=${street}&place=${place}&matrikkel=${matrikkel}&utm=${utm}&posDez=${posDez}&map=${map}`
}

export const generateSearchMatrikkelVegUrl = query => `${url}ws/veg.py?${encodeURIComponent(query)}`

export const generateSearchMatrikkelAdresseUrl = query => `${url}ws/adr.py?${encodeURIComponent(query)}`

export const generateSearchStedsnavnUrl = (query, side, antall) => `${urlGeonorge}SKWS3Index/v2/ssr/sok?navn=${encodeURIComponent(query)}*&eksakteForst=false&antPerSide=${antall}&epsgKode=32633&side=${side}`

export const generateSearchAdresseUrl = query => `${urlGeonorge}AdresseWS/adresse/sok?sokestreng=${encodeURIComponent(query)}&antPerSide=100&side=1`

export const generateElevationPointUrl = (lat, lon, epsgNumber) => `${urlOpenWps}wps.elevation?request=Execute&service=WPS&version=1.0.0&identifier=elevation&datainputs=[lat=${lat}lon=${lon}epsg=${epsgNumber}]`

export const generateMatrikkelInfoUrl = (minx, miny, maxx, maxy) => `${url}ws/wfs.teig.py?bbox=${minx},${miny},${maxx},${maxy}`

export const generateSeEiendomUrl = (knr, gnr, bnr, fnr, snr) => `${urlSeEiendom}services/Matrikkel.svc/GetDetailPage?type=property&knr=${knr}&gnr=${gnr}&bnr=${bnr}&fnr=${fnr}&snr=${snr}&customer=kartverket`

export const generateFaktaarkUrl = stedsnummer => urlFaktaark + stedsnummer

export const generateKoordTransUrl = (ost, nord, resSosiKoordSys) => `${url}/ws/trans.py?ost=${ost}&nord=${nord} &sosiKoordSys=84&resSosiKoordSys=${resSosiKoordSys}`

// export const generateSeHavnivaaUrl = (lat, lon) => `${urlHavnivaa}tideapi.php?lat=${lat}&lon=${lon}&lang=nb&year=${new Date().getFullYear()}&place=&tide_request=tidetable`
// export const generateSeHavnivaaUrl = (lat, lon) => `${urlHavnivaa}tideapi.php?lat=${lat}&lon=${lon}&refcode=cd&place=&lang=nb&file=&tide_request=locationlevels`

export const generateLagTurkartUrl = () => `${urlGeonorge}freeprint/getprint2.py`

export const generateEmergencyPosterPointUrl = (lat, lon) => `${url}ws/emergencyPoster.py?&lon=${lon},lat=${lat}`

export const generateSearchStedsnavnBboxUrl = (minx, miny, maxx, maxy) => `${urlGeonorge}SKWS3Index/ssr/sok?&nordLL=${miny}&ostLL=${minx}&nordUR=${maxy}&ostUR=${maxx}&epsgKode=32633`

// this.generateEmergencyPosterPreviewImageUrl = (minx, miny, maxx, maxy) => `${urlOpenWms}wms.topo2?service=WMS&request=GetMap&CRS=EPSG:32633&FORMAT=image%2Fjpeg&BGCOLOR=0xFFFFFF&TRANSPARENT=false&LAYERS=topo2_WMS&VERSION=1.3.0&WIDTH=${$(window).width()}&HEIGHT=${$(window).height()}&BBOX=${minx},${miny},${maxx},${maxy}`

export const generateGeoJSONUrl = hash => `${url}user/json-test/${hash}.json`

export const generateGeoJSONSaveUrl = () => `${url}ws/upload-json-test.py`

export const generateSearchMatrikkelNummerUrl = query => `${url}ws/eie.py?${encodeURIComponent(query)}`

export const generateMatrikkelWfsFilterUrl = (property) => {
  let _constructMarkingFilter = () => `FILTER=${encodeURIComponent(`${'<ogc:Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">' +
                '<And>' +
                '<ogc:PropertyIsEqualTo>' +
                '<ogc:PropertyName>KOMMUNENR</ogc:PropertyName>' +
                '<ogc:Literal>'}${property.kommunenr}</ogc:Literal>` +
                '</ogc:PropertyIsEqualTo>' +
                '<ogc:PropertyIsEqualTo>' +
                '<ogc:PropertyName>GARDSNR</ogc:PropertyName>' +
                `<ogc:Literal>${property.gardsnr}</ogc:Literal>` +
                '</ogc:PropertyIsEqualTo>' +
                '<ogc:PropertyIsEqualTo>' +
                '<ogc:PropertyName>BRUKSNR</ogc:PropertyName>' +
                `<ogc:Literal>${property.bruksnr}</ogc:Literal>` +
                '</ogc:PropertyIsEqualTo>' +
                '<ogc:PropertyIsEqualTo>' +
                '<ogc:PropertyName>FESTENR</ogc:PropertyName>' +
                `<ogc:Literal>${property.festenr}</ogc:Literal>` +
                '</ogc:PropertyIsEqualTo>' +
                '<ogc:PropertyIsEqualTo>' +
                '<ogc:PropertyName>SEKSJONSNR</ogc:PropertyName>' +
                `<ogc:Literal>${property.seksjonsnr}</ogc:Literal>` +
                '</ogc:PropertyIsEqualTo>' +
                '</And>' +
                '</ogc:Filter>')}`

  return `${url}ws/wfs.teig.py?${_constructMarkingFilter()}`
}

export const generateEiendomAddress = (kommunenr, gardsnr, bruksnr, festnr, sectionsnr) => {
  let baseUrl = `${url}ws/eiendom.py?`
  if (festnr !== '0') {
    if (sectionsnr === '0') {
      baseUrl += `${kommunenr}-${gardsnr}/${bruksnr}/${festnr}`
    } else {
      baseUrl += `${kommunenr}-${gardsnr}/${bruksnr}/${festnr}/${sectionsnr}`
    }
  } else {
    baseUrl += `${kommunenr}-${gardsnr}/${bruksnr}`
  }
  return `${baseUrl}&KILDE:Eiendom KOMMUNENR:${kommunenr} GARDSNR:${gardsnr} BRUKSNR:${bruksnr} SEKSJONSNR:${sectionsnr} FESTENR:${festnr}`
}

export const generateSearchEiendomUrl = query => `http://eiendom.statkart.no/Search.ashx?filter=KILDE:sted,matreiendom,SITEURLKEY:httpwwwseeiendomno,LESEGRUPPER:guests&term=${query}`

export const generateServiceDict = (query, page = '', hitsPerPage = '') => {
  // query = parseInput(query)
  let serviceDict = {}
  serviceDict['ssr'] = {
    url: generateSearchStedsnavnUrl(query, page, hitsPerPage),
    format: 'xml',
    source: 'ssr',
    epsg: 'EPSG:25833',
    nameID: 'stedsnavn',
    latID: 'nord',
    lonID: 'aust',
    kommuneID: 'kommunenavn',
    husnummerID: 'HUSNR',
    navnetypeID: 'navnetype'
  }
  serviceDict['matrikkelveg'] = {
    url: generateSearchMatrikkelVegUrl(query),
    format: 'json',
    source: 'matrikkelveg',
    epsg: 'EPSG:25832',
    nameID: 'NAVN',
    latID: 'LATITUDE',
    lonID: 'LONGITUDE',
    kommuneID: 'KOMMUNENAVN',
    husnummerID: 'HUSNUMMER',
    navnetypeID: false
  }
  serviceDict['matrikkeladresse'] = {
    url: generateSearchMatrikkelAdresseUrl(query),
    format: 'json',
    source: 'matrikkeladresse',
    epsg: 'EPSG:25832',
    nameID: 'NAVN',
    latID: 'LATITUDE',
    lonID: 'LONGITUDE',
    kommuneID: 'KOMMUNENAVN',
    husnummerID: false,
    navnetypeID: false
  }
  serviceDict['matrikkelnummer'] = {
    url: generateSearchMatrikkelNummerUrl(query),
    format: 'json',
    source: 'matrikkelnummer',
    epsg: 'EPSG:25832',
    nameID: 'NAVN',
    latID: 'LATITUDE',
    lonID: 'LONGITUDE',
    kommuneID: 'KOMMUNENAVN',
    husnummerID: false,
    navnetypeID: false
  }
  serviceDict['adresse'] = {
    url: generateSearchAdresseUrl(query),
    format: 'json',
    source: 'adresse',
    epsg: 'EPSG:4326',
    nameID: 'adressenavn',
    latID: 'nord',
    lonID: 'aust',
    kommuneID: false,
    husnummerID: false,
    navnetypeID: false
  }
  return serviceDict
}
