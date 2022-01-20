import { FC, ReactNode } from "react";
import {
  Text,
  Heading,
  HStack,
  VStack,
  Tag,
  Wrap,
  WrapItem,
  Tooltip,
  Center,
  CloseButton,
  TagLeftIcon,
  TagLabel,
} from "@chakra-ui/react";
import {
  IoStar,
  IoGitNetwork,
  IoEye,
  IoArchive,
  IoCopy,
  IoReceipt,
  IoRadioButtonOn,
  IoTime,
  IoTimer,
  IoCodeSlash,
} from "react-icons/io5";
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";
import { formatDistance } from "date-fns";
import { IconType } from "react-icons";

export const RepoCard: FC<{
  res: RestEndpointMethodTypes["repos"]["get"]["response"];
  id: number;
  onClose: (key: number) => void;
}> = ({ res, id, onClose }) => {
  const {
    full_name,
    stargazers_count: stars,
    forks_count: forks,
    description,
    archived: isArchived,
    fork: isFork,
    open_issues_count: issues,
    is_template: isTemplate,
    clone_url: url,
    watchers_count: watchers,
    license: licenseObject,
    language,
    created_at: createdAt,
    updated_at: updatedAt,
  } = res.data;
  const now = Date.now();
  const created = formatDistance(new Date(createdAt), now, { addSuffix: true });
  const lastUpdated = formatDistance(new Date(updatedAt), now, {
    addSuffix: true,
  });

  const [owner, repo] = full_name.split("/");
  const license = licenseObject?.spdx_id;
  return (
    <Center
      w="25rem"
      h="100%"
      textAlign="center"
      bgColor="gray.700"
      borderColor="gray.600"
      borderWidth="1px"
      borderRadius={15}
      p={7}
      pt={4}
    >
      <VStack gap={1}>
        <CloseButton size="lg" onClick={() => onClose(id)} />
        <Heading fontSize="1.5rem">
          <a href={url}>
            {owner}/{repo}
          </a>
        </Heading>
        {description ? <Text color="gray.400">{description}</Text> : null}
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
        <Wrap justify="center">
          <SmallStat label="Stars" content={stars} icon={IoStar} />
          <SmallStat label="Forks" content={forks} icon={IoGitNetwork} />
          <SmallStat label="Watchers" content={watchers} icon={IoEye} />
          <SmallStat
            label="Open Issues"
            content={issues}
            icon={IoRadioButtonOn}
          />
          <SmallStat
            label="License"
            content={license === "NOASSERTION" ? "Other" : license ?? "None"}
            icon={IoReceipt}
          />

          <SmallStat
            label="Language"
            content={language ?? "None"}
            icon={IoCodeSlash}
          />
        </Wrap>
        <VStack fontSize="1.25rem">
          <Tooltip label="Last Updated">
            <HStack>
              <IoTimer />
              <Text>{lastUpdated}</Text>
            </HStack>
          </Tooltip>
          <Tooltip label="Created">
            <HStack>
              <IoTime />
              <Text>{created}</Text>
            </HStack>
          </Tooltip>
        </VStack>
      </VStack>
    </Center>
  );
};

const SmallStat: FC<{ label: string; content: ReactNode; icon: IconType }> = ({
  label,
  content,
  icon,
}) => (
  <WrapItem>
    <Tooltip label={label}>
      <Tag size="lg">
        <TagLeftIcon as={icon} />
        <TagLabel>{content}</TagLabel>
      </Tag>
    </Tooltip>
  </WrapItem>
);
