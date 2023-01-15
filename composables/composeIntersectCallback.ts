import axios from "axios";

import { Ref } from "vue";
import { Repository } from "~/types/repositories";

export const composeIntersectCallback = ({
  userName,
  userIndex,
  isLoading,
  userLogins,
  repositories,
}: {
  userLogins: string[],
  userName: Ref<string>,
  userIndex: Ref<number>,
  isLoading: Ref<boolean>,
  repositories: Ref<Repository[] | undefined>
}) =>
  async (entry: IntersectionObserverEntry) => {
    const boundingRect = entry.boundingClientRect;
    const intersectionRect = entry.intersectionRect;

    if (boundingRect?.top === intersectionRect?.top) {
      isLoading.value = true;

      const response = await axios.get(`https://api.github.com/users/${userName.value}/repos`);

      isLoading.value = false;

      const fetchedRepositories: Repository[] = response.data;

      repositories.value?.push(...fetchedRepositories);

      userIndex.value += 1;

      userName.value = userLogins[userIndex.value];
    }
  };
