# Busca y descarga imagenes libres desde Wikimedia Commons (solo ASCII en este script).
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$dest = "D:\Proyectos\Curso_Arduino\recursos\img"
New-Item -ItemType Directory -Force $dest | Out-Null
$ua = "CursoArduinoNinos/1.0 (pabgonza@gmail.com)"
$api = "https://commons.wikimedia.org/w/api.php"

$temas = @(
  @{slug="ivrea";          q="Ivrea panorama"},
  @{slug="rey-arduino";    q="Arduino d'Ivrea king"},
  @{slug="massimo-banzi";  q="Massimo Banzi"},
  @{slug="primer-arduino"; q="Arduino serial board"},
  @{slug="arduino-uno";    q="Arduino Uno R3"},
  @{slug="protoboard";     q="breadboard electronics"},
  @{slug="hc-sr04";        q="HC-SR04 ultrasonic"},
  @{slug="servo-sg90";     q="SG90 micro servo"},
  @{slug="buzzer";         q="piezoelectric buzzer"},
  @{slug="led-rgb";        q="RGB LED diode"},
  @{slug="dht11";          q="DHT11 sensor"},
  @{slug="potenciometro";  q="rotary potentiometer"},
  @{slug="leds";           q="light emitting diodes colors"}
)

$creditos = @()
foreach ($t in $temas) {
  try {
    $qs = [uri]::EscapeDataString($t.q)
    $res = Invoke-RestMethod -UserAgent $ua -Uri "${api}?action=query&format=json&list=search&srsearch=$qs&srnamespace=6&srlimit=8"
    $hit = $res.query.search | Where-Object { $_.title -match '\.(jpe?g|png)$' } | Select-Object -First 1
    if (-not $hit) { Write-Output ("[SIN RESULTADO] " + $t.slug); continue }
    $titulo = [uri]::EscapeDataString($hit.title)
    $info = Invoke-RestMethod -UserAgent $ua -Uri "${api}?action=query&format=json&titles=$titulo&prop=imageinfo&iiprop=url%7Cextmetadata&iiurlwidth=900"
    $page = ($info.query.pages.PSObject.Properties | Select-Object -First 1).Value
    $ii = $page.imageinfo[0]
    $thumb = if ($ii.thumburl) { $ii.thumburl } else { $ii.url }
    $ext = [IO.Path]::GetExtension(([uri]$thumb).AbsolutePath).ToLower()
    $archivo = Join-Path $dest ($t.slug + $ext)
    Invoke-WebRequest -UserAgent $ua -Uri $thumb -OutFile $archivo
    $autor = ($ii.extmetadata.Artist.value -replace '<[^>]+>','').Trim()
    if ($autor.Length -gt 80) { $autor = $autor.Substring(0,80) }
    $lic = $ii.extmetadata.LicenseShortName.value
    $nombre = $t.slug + $ext
    $tituloLimpio = $hit.title -replace '^File:',''
    $creditos += ("- ``" + $nombre + "`` -- " + $tituloLimpio + " | Autor: " + $autor + " | Licencia: " + $lic + " | [fuente](" + $ii.descriptionurl + ")")
    Write-Output ("[OK] " + $nombre + "  de  " + $hit.title + "  (" + $lic + ")")
  } catch { Write-Output ("[ERROR] " + $t.slug + " (linea " + $_.InvocationInfo.ScriptLineNumber + "): " + $_.Exception.Message) }
}

$md = @("# Creditos de imagenes", "", "Imagenes descargadas de Wikimedia Commons. Uso educativo con atribucion.", "") + $creditos
[IO.File]::WriteAllLines((Join-Path $dest "CREDITOS.md"), $md, (New-Object Text.UTF8Encoding $false))
Write-Output ("" + $creditos.Count + "/" + $temas.Count + " imagenes descargadas.")
