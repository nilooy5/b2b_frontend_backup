<?php
$api_base_url = "https://api.dev-sheba.xyz";
$business_base_url = "https://b2b.dev-sheba.xyz";

$api_url = $api_base_url . "/v2/businesses/tenders/";
$tender_page_url = $business_base_url . "/tender/list/" . $_GET['id'];

$response = file_get_contents($api_url . $_GET['id']);
$tender = json_decode($response, true)['tender'];

$title = $tender["title"] ?: substr($tender["description"], 0, 20);

return makePage($tender, $title, $tender_page_url);

/**
 * @param $tender
 * @param $title
 * @param $page_url
 * @return string
 */
function makePage($tender, $title, $page_url)
{
    $html = '<!doctype html>' . PHP_EOL;
    $html .= '<html>' . PHP_EOL;
    $html .= '<head>' . PHP_EOL;
    $html .= '<meta property="fb:app_id" content="323841817978882"/>' . PHP_EOL;
    $html .= '<meta name="author" content="business.sheba.xyz"/>' . PHP_EOL;
    $html .= '<meta property="og:title" content="' . $title . '"/>' . PHP_EOL;
    $html .= '<meta property="og:description" content="' . $tender['description'] . '"/>' . PHP_EOL;
    $html .= '<meta property="og:image" content="https://cdn-shebaxyz.s3.ap-south-1.amazonaws.com/b2b/og-images/tender-to-fb-thumbnail-og.jpg"/>' . PHP_EOL;
    $html .= '<meta property="og:type" content="website"/>' . PHP_EOL;
    $html .= '<meta property="og:url" content="' . $page_url . '"/>' . PHP_EOL;
    $html .= '<meta property="og:site_name" content="sBusiness.xyz"/>' . PHP_EOL;
    $html .= '<meta http-equiv="refresh" content="0;url=' . $page_url . '">' . PHP_EOL;
    $html .= '</head>' . PHP_EOL;
    $html .= '<body></body>' . PHP_EOL;
    $html .= '</html>';

    echo $html;
}
