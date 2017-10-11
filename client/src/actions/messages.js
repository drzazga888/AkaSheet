const messageTimeout = 5000

export const ADD_MESSAGE = 'ADD_MESSAGE'
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE'

let msgTimeouts = {}

const addMessage = (message, severity) => (dispatch) => {
    msgTimeouts[message] && clearTimeout(msgTimeouts[message])
    dispatch({ type: ADD_MESSAGE, message, severity, date: (new Date()).toJSON() })
    msgTimeouts[message] = setTimeout(() => {
        dispatch({ type: REMOVE_MESSAGE, message })
    }, messageTimeout)
}

const addErrorMessage = (message) => addMessage(message, 'error')

export const addSuccessMessage = (message) => addMessage(message, 'success')

export const addErrorFromResponseCode = (code) => {
    switch (code) {
        case 400:
            return addErrorMessage('Przesłane dane z formularza są błędne!')
        case 401:
            return addErrorMessage('Błędne dane autoryzacyjne!')
        case 403:
            return addErrorMessage('Zasób nie należy do uwierzytelnionego użytkownika!')
        case 404:
            return addErrorMessage('Zasób nie został znaleziony!')
        case 409:
            return addErrorMessage('Wartość pola indentyfikującego zasób (np. nazwa bądź e-mail) jest już wykorzystana. Spróbuj podać inną wartość!')
        default:
            return addErrorMessage('Wystąpił błąd podczas przetwarzania żądania: ' + (code || '(brak kodu odpowiedzi)'))
    }
}