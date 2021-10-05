import {environment} from "../../../environments/environment";

export const login_url = environment.accounts_url + 'login?redirect_url=' + environment.site_url + 'validate-login';
export const PageSizeOptions = ['1', '15', '25', '50', '100'];
