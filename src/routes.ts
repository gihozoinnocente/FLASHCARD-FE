// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Flashcards from "./pages/Flashcards";
import Signup from "./pages/Signup";

// other
import {FC} from "react";

// interface
interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<{}>
}

export const routes: Array<Route> = [
    {
        key: 'home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: Home
    },
    {
        key: 'about-route',
        title: 'About',
        path: '/about',
        enabled: true,
        component: About
    },
    {
        key: 'products-route',
        title: 'Flashcards',
        path: '/flashcards',
        enabled: true,
        component: Flashcards
    },
    {
        key: 'signup-route',
        title: 'Signup',
        path: '/signup',
        enabled: true,
        component: Signup
    }
]