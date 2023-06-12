import React, { createContext, Dispatch, useReducer } from 'react';
import { ChatInterface } from '../interfaces/interfaces';

type Action = { type: string; payload: any };

type AppContextValue = {
  state: State;
  dispatch: Dispatch<Action>;
};

type State = {
  chats: ChatInterface[];
  toast: any;
};

const initialState: State = {
  chats: [
    {
      id: 'message1',
      sender: 'user',
      message: 'Hello there!',
      timestamp: '2023-05-30T10:15:00Z'
    },
    {
      id: 'message2',
      sender: 'chatbot',
      message: 'Hi John, how are you?',
      timestamp: '2023-05-30T10:16:00Z'
    },
    {
      id: 'message3',
      sender: 'user',
      message: "I'm doing well, thank you!",
      timestamp: '2023-05-30T10:17:00Z'
    },
    {
      id: 'message4',
      sender: 'chatbot',
      message: "That's great to hear! What are you up to today?",
      timestamp: '2023-05-30T10:18:00Z'
    },
    {
      id: 'message5',
      sender: 'user',
      message: "I'm just working on some projects. How about you?",
      timestamp: '2023-05-30T10:19:00Z'
    },
    {
      id: 'message6',
      sender: 'chatbot',
      message: "I'm just helping some people with their questions. It's always nice to be able to help others.",
      timestamp: '2023-05-30T10:20:00Z'
    },
    {
      id: 'message7',
      sender: 'user',
      message: "That's great! I'm glad you're able to use your skills to help others.",
      timestamp: '2023-05-30T10:21:00Z'
    },
    {
      id: 'message8',
      sender: 'chatbot',
      message: "Thanks! I'm always happy to help. So, what are you working on today?",
      timestamp: '2023-05-30T10:22:00Z'
    },
    {
      id: 'message9',
      sender: 'user',
      message: "I'm working on a new website for my business. I'm hoping to launch it by the end of the month.",
      timestamp: '2023-05-30T10:23:00Z'
    },
    {
      id: 'message10',
      sender: 'chatbot',
      message: "That sounds exciting! I'm sure it will be a great success.",
      timestamp: '2023-05-30T10:24:00Z'
    },
    {
      id: 'message11',
      sender: 'user',
      message: "Thanks! I'm hoping so.",
      timestamp: '2023-05-30T10:25:00Z'
    },
    {
      id: 'message12',
      sender: 'chatbot',
      message: "Well, I'm sure it will be. You're very talented and hardworking.",
      timestamp: '2023-05-30T10:26:00Z'
    },
    {
      id: 'message13',
      sender: 'user',
      message: 'Thanks! That means a lot to me.',
      timestamp: '2023-05-30T10:27:00Z'
    },
    {
      id: 'message14',
      sender: 'chatbot',
      message: "You're welcome! I'm always happy to offer encouragement.",
      timestamp: '2023-05-30T10:28:00Z'
    }
  ],
  toast: null
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'clearChat': {
      return { ...state, chats: [] };
    }
    case 'AddToChat': {
      return { ...state, chats: [...state.chats, action.payload] };
    }

    case 'SetToastRef': {
      console.log(action);
      return { ...state, toast: action.payload };
    }
    default:
      return state;
  }
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue: AppContextValue = {
    state,
    dispatch
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider, AppContextValue };
