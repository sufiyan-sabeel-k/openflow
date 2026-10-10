/* OpenFlow auth API client (static Pages frontend -> separate PHP backend).
 * No secrets here. Session uses the backend's HttpOnly cookie.
 * All requests send X-Requested-With (required by the API for CSRF defense)
 * and include credentials so the cross-site session cookie is sent.
 */
(function () {
  'use strict';

  function base() {
    var b = (window.OPENFLOW_API_BASE || '').trim().replace(/\/+$/, '');
    return b;
  }

  function configured() {
    return base() !== '';
  }

  function request(path, options) {
    options = options || {};
    if (!configured()) {
      return Promise.reject(new Error('NOT_CONFIGURED'));
    }
    var init = {
      method: options.method || 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    };
    if (options.csrf) {
      init.headers['X-CSRF-Token'] = options.csrf;
    }
    if (options.body !== undefined) {
      init.body = JSON.stringify(options.body);
    }
    return fetch(base() + path, init).then(function (r) {
      return r.json().then(function (j) {
        return { status: r.status, body: j || {} };
      }).catch(function () {
        return { status: r.status, body: { success: false, error: 'Invalid server response.' } };
      });
    });
  }

  window.OpenFlowAuth = {
    configured: configured,
    register: function (payload, csrf) {
      return request('/api/auth/register.php', { method: 'POST', body: payload, csrf: csrf });
    },
    login: function (payload, csrf) {
      return request('/api/auth/login.php', { method: 'POST', body: payload, csrf: csrf });
    },
    logout: function (csrf) {
      return request('/api/auth/logout.php', { method: 'POST', body: {}, csrf: csrf });
    },
    me: function () {
      return request('/api/auth/me.php', { method: 'GET' });
    },
    verifyEmail: function (token) {
      return request('/api/auth/verify-email.php?token=' + encodeURIComponent(token), { method: 'GET' });
    },
    forgotPassword: function (email, csrf) {
      return request('/api/auth/forgot-password.php', { method: 'POST', body: { email: email }, csrf: csrf });
    },
    resetPassword: function (token, password, csrf) {
      return request('/api/auth/reset-password.php', { method: 'POST', body: { token: token, password: password }, csrf: csrf });
    }
  };
})();
