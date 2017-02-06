
export const searchServices = () => {
  const url = 'http://www.norgeskart.no/'
  const urlOpenWps = 'http://openwps.statkart.no/skwms1/'
  const urlOpenWms = 'http://openwms.statkart.no/skwms1/'
  const urlGeonorge = 'https://ws.geonorge.no/'
  const urlSeEiendom = 'http://www.seeiendom.no/'
  const urlFaktaark = 'https://stadnamn.kartverket.no/fakta/'
  const urlHavnivaa = 'http://api.sehavniva.no/'

  this.uploadGpxFileService = () => `${url}ws/upload-gpx.py`

  this.generateElevationChartServiceUrl = (gpxFile) => {
    const serviceUrl = `${urlOpenWps}wps.elevation?request=Execute&service=WPS&version=1.0.0&identifier=elevationChart&dataInputs=`
    return `${serviceUrl}[gpx=${gpxFile}] `
  }

  this.generateMapLinkServiceUrl = (config) => {
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

  this.generateEmergencyPosterServiceUrl = (config) => {
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

  this.generateSearchMatrikkelVegUrl = query => `${url}ws/veg.py?${encodeURIComponent(query)}`

  this.generateSearchMatrikkelAdresseUrl = query => `${url}ws/adr.py?${encodeURIComponent(query)}`

  this.generateSearchStedsnavnUrl = (query, side, antall) => `${urlGeonorge}SKWS3Index/v2/ssr/sok?navn=${encodeURIComponent(query)}*&eksakteForst=false&antPerSide=${antall}&epsgKode=32633&side=${side}`

  this.generateSearchAdresseUrl = query => `${urlGeonorge}AdresseWS/adresse/sok?sokestreng=${encodeURIComponent(query)}&antPerSide=100&side=1`

  this.generateElevationPointUrl = (lat, lon, epsgNumber) => `${urlOpenWps}wps.elevation?request=Execute&service=WPS&version=1.0.0&identifier=elevation&datainputs=[lat=${lat}lon=${lon}epsg=${epsgNumber}]`

  this.generateMatrikkelInfoUrl = (minx, miny, maxx, maxy) => `${url}ws/wfs.teig.py?bbox=${minx},${miny},${maxx},${maxy}`

  this.generateSeEiendomUrl = (knr, gnr, bnr, fnr, snr) => `${urlSeEiendom}services/Matrikkel.svc/GetDetailPage?type=property&knr=${knr}&gnr=${gnr}&bnr=${bnr}&fnr=${fnr}&snr=${snr}&customer=kartverket`

  this.generateFaktaarkUrl = stedsnummer => urlFaktaark + stedsnummer

  this.generateKoordTransUrl = (ost, nord, resSosiKoordSys) => `${url}/ws/trans.py?ost=${ost}&nord=${nord} &sosiKoordSys=84&resSosiKoordSys=${resSosiKoordSys}`

  this.generateSeHavnivaaUrl = (lat, lon) => `${urlHavnivaa}tideapi.php?lat=${lat}&lon=${lon}&lang=nb&year=${new Date().getFullYear()}&place=&tide_request=tidetable`

  this.generateLagTurkartUrl = () => `${urlGeonorge}freeprint/getprint2.py`

  this.generateEmergencyPosterPointUrl = (lat, lon) => `${url}ws/emergencyPoster.py?&lon=${lon},lat=${lat}`

  this.generateSearchStedsnavnBboxUrl = (minx, miny, maxx, maxy) => `${urlGeonorge}SKWS3Index/ssr/sok?&nordLL=${miny}&ostLL=${minx}&nordUR=${maxy}&ostUR=${maxx}&epsgKode=32633`

  // this.generateEmergencyPosterPreviewImageUrl = (minx, miny, maxx, maxy) => `${urlOpenWms}wms.topo2?service=WMS&request=GetMap&CRS=EPSG:32633&FORMAT=image%2Fjpeg&BGCOLOR=0xFFFFFF&TRANSPARENT=false&LAYERS=topo2_WMS&VERSION=1.3.0&WIDTH=${$(window).width()}&HEIGHT=${$(window).height()}&BBOX=${minx},${miny},${maxx},${maxy}`

  this.generateGeoJSONUrl = hash => `${url}user/json-test/${hash}.json`

  this.generateGeoJSONSaveUrl = () => `${url}ws/upload-json-test.py`

  this.generateSearchMatrikkelNummerUrl = query => `${url}ws/eie.py?${encodeURIComponent(query)}`

  this.generateMatrikkelWfsFilterUrl = (property) => {
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

  this.generateEiendomAddress = (kommunenr, gardsnr, bruksnr, festnr, sectionsnr) => {
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

  this.generateSeHavnivaaUrl = (lat, lon) => `${urlHavnivaa}tideapi.php?lat=${lat}&lon=${lon}&refcode=cd&place=&lang=nb&file=&tide_request=locationlevels`

  this.generateSearchEiendomUrl = query => `http://eiendom.statkart.no/Search.ashx?filter=KILDE:sted,matreiendom,SITEURLKEY:httpwwwseeiendomno,LESEGRUPPER:guests&term=${query}`
}
