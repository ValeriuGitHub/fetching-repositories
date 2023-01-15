<template>
  <div class="wrapper">
    <transition name="fade">
      <LoadingState v-if="isLoading" />
    </transition>

    <RepositoryItem
      v-for="repository in sortedRepositories"
      :key="repository.id"
      :repository="repository"
    />

    <div ref="target" class="target"></div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { computed, ref, watch, PropType } from "vue";
import { composeIntersectCallback } from "~/composables/composeIntersectCallback";
import { Repository } from "~/types/repositories";
import { User } from "~/types/users";

import useIntersectionObserver from "~/utils/useIntersectionObserver";
import RepositoryItem from "~/components/RepositoryItem.vue";
import LoadingState from "~/components/LoadingState.vue";

interface TProps {
  users: User[];
}

export default {
  components: {
    LoadingState,
    RepositoryItem,
  },

  props: {
    users: {
      type: Array as PropType<User[]>,
      required: true,
    },
  },

  setup(props: TProps) {
    const target = ref<HTMLElement>();

    const userLogins = props.users.map((user: User) => user.login);
    const userIndex = ref(0);
    const userName = ref(userLogins[userIndex.value]);
    const isLoading = ref(false);

    const repositories = ref<Repository[]>();

    const intersectCallback = composeIntersectCallback({
      userName,
      userIndex,
      isLoading,
      userLogins,
      repositories,
    });

    watch(
      target,
      async () => {
        if (!target?.value) {
          return;
        }

        if (!userIndex.value) {
          isLoading.value = true;

          const initResponse = await axios.get(
            `https://api.github.com/users/${userName.value}/repos`
          );

          const initRepositories: Repository[] = initResponse.data;

          userName.value = userLogins[1];

          repositories.value = initRepositories;

          isLoading.value = false;
        }

        useIntersectionObserver.observeElement(target.value, intersectCallback);
      },
      { immediate: true }
    );

    const sortedRepositories = computed(() => {
      return repositories.value
        ?.slice()
        .sort(
          (firstRepository, secondRepository) =>
            secondRepository.stargazers_count - firstRepository.stargazers_count
        );
    });

    return {
      target,
      userName,
      userIndex,
      isLoading,
      sortedRepositories,
    };
  },
};
</script>

<style scoped>
.wrapper {
  margin-top: 20px;
}

.target {
  height: 1px;
}
</style>
