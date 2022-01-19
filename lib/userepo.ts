import { useContext, useEffect, useState } from "react";
import { OctokitContext } from "../components/octokitprovider";
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

export const useRepo = ({ owner, repo }: { owner: string; repo: string }) => {
  const [res, setRes] = useState<
    RestEndpointMethodTypes["repos"]["get"]["response"] | null
  >(null);
  const [error, setError] = useState<any>(null);

  const octokit = useContext(OctokitContext);

  useEffect(() => {
    octokit.rest.repos
      .get({ owner, repo })
      .then((res) => {
        setRes(res);
        setError(null);
      })
      .catch((error) => {
        setRes(null);
        setError(error);
      });
  }, [octokit.rest.repos, owner, repo]);

  return { res, error };
};
