
export const SITE_KEY_RECAPTCHA = "6LfI0tcfAAAAAH7KsozHHXBoX3vyen_VroWFGG8K";

export const URL_SERVIDOR = "http://localhost:8000";

export const URL_SERVIDOR_IMAGEN = URL_SERVIDOR + "/static/fotos";

//**************************** URLs de API ******************************/

export const URL_API_OBTEN_TOKEN = URL_SERVIDOR + "/token";

export const URL_API_OBTEN_USUARIO_ME = URL_SERVIDOR + "/usuarios/me";

export const URL_API_CREAR_USUARIO = URL_SERVIDOR + "/registro";
export const URL_API_OBTEN_USUARIO = URL_SERVIDOR + "/usuario/{idUsuario}";
export const URL_API_ELIMINAR_USUARIO = URL_API_OBTEN_USUARIO;
export const URL_API_ACTUALIZAR_USUARIO = URL_API_OBTEN_USUARIO;
export const URL_API_GUARDAR_AVATAR_USUARIO = URL_SERVIDOR + "/usuario/{idUsuario}/avatar";

export const URL_API_GUARDAR_Y_CLASIFICAR_FOTO_USUARIO = URL_SERVIDOR + "/usuarios/{idUsuario}/foto";
export const URL_API_OBTENER_FOTO_CLASIFICADA =  URL_SERVIDOR + "/foto/{idFoto}";

export const URL_API_OBTENER_RAZAS =  URL_SERVIDOR + "/razasCompletas";

export const URL_API_OBTENER_FOTOS_CLASIFICADAS_USUARIO =  URL_SERVIDOR + "/usuario/{idUsuario}/fotos";

export const URL_API_OBTENER_USUARIOS =  URL_SERVIDOR + "/usuariosCompletos";


