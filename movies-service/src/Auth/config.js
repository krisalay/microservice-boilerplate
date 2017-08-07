const client = {
	"application_type": "web",
	"backchannel_logout_session_required": false,
	"grant_types": ["authorization_code", "refresh_token"],
	"id_token_signed_response_alg": "RS256",
	"post_logout_redirect_uris": ["http://localhost:3001/"],
	"require_auth_time": false,
	"response_types": ["code"],
	"subject_type": "public",
	"token_endpoint_auth_method": "client_secret_basic",
	"client_id": "e1ffafbb-6b38-44e6-8754-d7a975782be3",
	"client_id_issued_at": 1500622219,
	"client_secret": "O1Nxyz3cx2T+gextX/Oa6Z7zTd8X7OdLug0hsYYKFXG1jrDY7v16Ex+EafvG5CSL",
	"client_secret_expires_at": 0,
	"redirect_uris": ["http://localhost:3001/cb"],
	"registration_client_uri": "http://localhost:3000/reg/e1ffafbb-6b38-44e6-8754-d7a975782be3",
	"registration_access_token": "N2IwNTQ5ZDMtMGVmYS00NDcyLWJhZDctMGM5YjAwMGUxMGM5GYJgY0rPSLhEOHX0mgZI-35hTbJy_YIokiPHa1n0zs7YRbpBYE26iJohA-yCgr1F73NPb6sCDdqKJOIx1MQt2g"
};


module.exports = {
	authClient: client
}