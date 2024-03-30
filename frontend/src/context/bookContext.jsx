import { createContext, useReducer } from "react";
export const BookContext = createContext();
export const bookReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_BOOKS':
            return {
                ...state,
                books: action.payload,
                status: 'success',
                error: null
            };
        case 'FETCH_BOOKS_ERROR':
            return {
                ...state,
                books: [],
                status: 'error',
                error: action.payload
            };
        case 'FETCH_BOOKS_LOADING':
            return {
                ...state,
                books: [],
                status: 'loading',
                error: null
            };
        case 'ADD_QUERY':
            const bookId = action.payload.bookId;
            const query = action.payload.query;
            const books = state.books.map(book => {
                if (book._id === bookId) {
                    console.table(book.queries);
                    return {
                        ...book,
                        queries: [...book.queries, query]
                    }
                }
                return book;
            });
            return {
                ...state,
                books
            };
        default:
            return state;
    }
};

export const BookProvider = ({ children }) => {
    
    const initialState = {
        books: [],
        status: null,
        error: null
    };
    const [state, dispatchb] = useReducer(bookReducer, initialState);
    return (
        <BookContext.Provider value={{state, dispatchb}}>
            {children}
        </BookContext.Provider>
    )
};

export default BookProvider;