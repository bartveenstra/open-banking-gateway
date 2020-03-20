import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DocumentCookieService } from './document-cookie.service';
import { Consts } from '../common/consts';

describe('AuthService', () => {
  let authService: AuthService;
  const cookieService: DocumentCookieService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService, DocumentCookieService]
    });

    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should navigate to login page after called logout', () => {
    const navigateSpy = spyOn(router, 'navigate');
    authService.logout();

    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should test login method', () => {
    // isLoggedin() is false by default
    expect(cookieService.exists(Consts.COOKIE_NAME_XSRF_TOKEN)).toBeFalsy();

    // login credential is not correct
    const credentialsMock = { username: 'test', password: '12345' };
    authService.login(credentialsMock).subscribe(response => {
      expect(response).toBeTruthy();
    });
  });
});