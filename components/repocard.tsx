import { FC } from "react";
import { useRepo } from "../lib/userepo";
import {
  Text,
  Heading,
  HStack,
  Spinner,
  VStack,
  Tag,
  Box,
  useToken,
  Wrap,
  WrapItem,
  Tooltip,
  Center,
  CloseButton,
} from "@chakra-ui/react";
import {
  IoStar,
  IoGitNetwork,
  IoEye,
  IoArchive,
  IoCopy,
  IoReceipt,
  IoRadioButtonOn,
} from "react-icons/io5";

export const RepoCard: FC<{
  owner: string;
  repo: string;
  id: number;
  onClose: (key: number) => void;
  onError: (error: any) => void;
}> = ({ owner, repo, id, onClose, onError }) => {
  const { res, error } = useRepo({ owner, repo });
  if (error) {
    console.log(error);
    onError(error);
    onClose(id);
    return null;
  }
  if (!res)
    return (
      <Center
        w="25rem"
        h="100%"
        minH="25rem"
        bgColor="gray.700"
        borderColor="gray.600"
        borderWidth="1px"
        borderRadius={15}
        p={7}
      >
        <Spinner />
      </Center>
    );
  const {
    stargazers_count: stars,
    forks_count: forks,
    description,
    topics,
    archived: isArchived,
    fork: isFork,
    open_issues_count: issues,
    is_template: isTemplate,
    clone_url: url,
    watchers_count: watchers,
    license: licenseObject,
  } = res.data;
  const license = licenseObject?.name;

  return (
    <BaseRepoCard
      {...{
        owner,
        repo,
        stars,
        forks,
        description,
        topics,
        isArchived,
        isFork,
        issues,
        isTemplate,
        url,
        watchers,
        license,
      }}
      onClose={() => onClose(id)}
    />
  );
};

const BaseRepoCard: FC<{
  isArchived: boolean;
  isTemplate?: boolean;
  isFork: boolean;
  topics?: string[];
  owner: string;
  repo: string;
  stars: number;
  forks: number;
  watchers: number;
  issues: number;
  description: string | null;
  url: string;
  license?: string;
  onClose: () => void;
}> = ({
  isArchived,
  isTemplate,
  isFork,
  topics,
  owner,
  repo,
  stars,
  watchers,
  forks,
  issues,
  description,
  url,
  license,
  onClose,
}) => {
  const [starColor, issueColor] = useToken("colors", [
    "yellow.400",
    "green.400",
  ]);

  return (
    <Center
      w="25rem"
      minH="100%"
      textAlign="center"
      bgColor="gray.700"
      borderColor="gray.600"
      borderWidth="1px"
      borderRadius={15}
      p={7}
      pt={4}
    >
      <VStack>
        <CloseButton size="lg" onClick={onClose} />
        <Heading fontSize="1.5rem">
          <a href={url}>
            {owner}/{repo}
          </a>
        </Heading>
        {description ? <Text color="gray.400">{description}</Text> : null}
        {topics ? (
          <Wrap justify="center">
            {topics.map((topic, i) => (
              <WrapItem key={i}>
                <Tag>{topic}</Tag>
              </WrapItem>
            ))}
          </Wrap>
        ) : null}
        <HStack fontSize="1.2rem">
          {isArchived ? (
            <Tooltip label="Archived">
              <span>
                <IoArchive />
              </span>
            </Tooltip>
          ) : null}
          {isTemplate ? (
            <Tooltip label="Template">
              <span>
                <IoCopy />
              </span>
            </Tooltip>
          ) : null}
          {isFork ? (
            <Tooltip label="Fork">
              <span>
                <IoGitNetwork />
              </span>
            </Tooltip>
          ) : null}
        </HStack>
        <VStack fontSize="1.5rem">
          <Tooltip label="Stars">
            <HStack>
              <IoStar style={{ color: starColor }} />
              <Text>{stars}</Text>
            </HStack>
          </Tooltip>
          <Tooltip label="Forks">
            <HStack>
              <IoGitNetwork />
              <Text>{forks}</Text>
            </HStack>
          </Tooltip>
          <Tooltip label="Watchers">
            <HStack>
              <IoEye />
              <Text>{watchers}</Text>
            </HStack>
          </Tooltip>
          <Tooltip label="Open Issues">
            <HStack>
              <IoRadioButtonOn style={{ color: issueColor }} />
              <Text>{issues}</Text>
            </HStack>
          </Tooltip>
        </VStack>
        <HStack>
          <IoReceipt />
          <Text>{license ?? "No License"}</Text>
        </HStack>
      </VStack>
    </Center>
  );
};
