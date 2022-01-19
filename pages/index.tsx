import { HStack, VStack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import { RepoCard } from "../components/repocard";
import { RepoInput } from "../components/repoinput";

const Index: NextPage = () => {
  const [repos, setRepos] = useState<{ owner: string; repo: string }[]>([]);
  const [error, setError] = useState<any>(null);
  return (
    <VStack h="100vh" p={{ base: 4, md: 10 }} gap={{ base: 5, md: 10 }}>
      <RepoInput
        onSubmit={(newRepo) => {
          if (
            !repos
              .map((repo) => JSON.stringify(repo))
              .includes(JSON.stringify(newRepo))
          ) {
            setError(null);
            setRepos((repos) => [...repos, newRepo]);
          }
        }}
        isError={!!error}
      />
      <HStack
        maxW="100%"
        overflow="scroll"
        align="start"
        className="hide-scrollbar"
      >
        {repos.map((repo, i) => (
          <RepoCard
            {...repo}
            key={i}
            id={i}
            onError={setError}
            onClose={(key) =>
              setRepos((repos) => [
                ...repos.slice(0, key),
                ...repos.slice(key + 1),
              ])
            }
          />
        ))}
      </HStack>
      <Text color="gray.500">
        {repos.length
          ? "Focus on cards and use Left and Right arrow keys to scroll horizontally"
          : "Enter a repository above to get started!"}
      </Text>
    </VStack>
  );
};

export default Index;
