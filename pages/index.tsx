import { Wrap, VStack, Text, WrapItem } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import { RepoCard } from "../components/repocard";
import { RepoInput } from "../components/repoinput";
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";
import Head from "next/head";

const Index: NextPage = () => {
  const [repos, setRepos] = useState<
    RestEndpointMethodTypes["repos"]["get"]["response"][]
  >([]);
  return (
    <VStack h="100vh" p={{ base: 4, md: 10 }} gap={{ base: 5, md: 10 }}>
      <Head>
        <title>GitHub Repo Compare</title>
      </Head>
      <RepoInput
        onSubmit={(newRepo) => {
          if (
            !repos
              .map((repo) => JSON.stringify(repo))
              .includes(JSON.stringify(newRepo))
          ) {
            setRepos((repos) => [...repos, newRepo]);
          }
        }}
      />
      <Wrap maxW="100%" align="start" justify="center" wrap="wrap" spacing={5}>
        {repos.map((repo, i) => (
          <WrapItem key={i} h="100%">
            <RepoCard
              res={repo}
              id={i}
              onClose={(key) =>
                setRepos((repos) => [
                  ...repos.slice(0, key),
                  ...repos.slice(key + 1),
                ])
              }
            />
          </WrapItem>
        ))}
      </Wrap>
      {repos.length ? null : (
        <Text color="gray.500">Enter a repository above to get started!</Text>
      )}
    </VStack>
  );
};

export default Index;
