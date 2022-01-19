import { Octokit } from "octokit";
import { createContext } from "react";

export const OctokitContext = createContext(new Octokit());
