export const MESSAGE_RESPONSE_BAD_REQEST = 'Przesłane dane z formularza są błędne!'
export const MESSAGE_RESPONSE_UNAUTHORIZED = 'Błędne dane autoryzacyjne!'
export const MESSAGE_RESPONSE_FORBIDDEN = 'Zasób nie należy do uwierzytelnionego użytkownika!'
export const MESSAGE_RESPONSE_NOT_FOUND = 'Zasób nie został znaleziony!'
export const MESSAGE_RESPONSE_CONFLICT = 'Wartość pola indentyfikującego zasób (np. nazwa bądź e-mail) jest już wykorzystana. Spróbuj podać inną wartość!'
export const MESSAGE_RESPONSE_ERROR = code => `Wystąpił błąd podczas przetwarzania żądania: ${code || '(brak kodu odpowiedzi)'}`

export const MESSAGE_SESSION_POST_SUCCESS = 'Zostałeś zalogowany pomyślnie!'
export const MESSAGE_SESSION_DELETE_SUCCESS = 'Zostałeś poprawnie wylogowany.'

export const MESSAGE_USER_POST_SUCCESS = 'Rejestracja przebiegła pomyślnie. Musisz poczekać na decyzję administratora zanim będziesz mógł się zalogować.'
export const MESSAGE_USER_GET_SUCCESS = 'Sesja została przywrócona pomyślnie!'

export const MESSAGE_PAGE_NOT_FOUND = 'Wybrany zasób nie istnieje.'
export const MESSAGE_PAGE_SIGN_IN_NEEDED = 'Zawartość na tej stronie dostępna jest tylko dla zalogowanych użytkowników.'
export const MESSAGE_PAGE_LOG_OUT_NEEDED = 'Zawartość na tej stronie dostępna jest tylko dla niezalogowanych użytkowników.'
export const MESSAGE_PAGE_ERROR = code => `Wystąpił błąd podczas ładowania danych: ${code || '(brak kodu odpowiedzi)'}`
export const MESSAGE_PAGE_SESSION_GONE = 'Sesja wygasła. Musisz zalogować się ponownie.'
