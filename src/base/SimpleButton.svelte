<script lang="ts">
  import Icon from "./Icon.svelte";

  interface Props {
    activeButtons: string[];
    disabled: boolean;
    key: string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    action: Function;
    icon: string;
  }

  let {
    activeButtons = $bindable(),
    disabled = $bindable(),
    key = $bindable(),
    action = $bindable(),
    icon = $bindable(),
  }: Props = $props();

  function handleClick() {
    action();

    if (activeButtons.includes(key)) {
      activeButtons = activeButtons.filter((k) => k !== key);
    } else {
      activeButtons = [...activeButtons, key];
    }
  }
</script>

<button
  {disabled}
  class:active={activeButtons.includes(key)}
  class={key}
  onclick={handleClick}
>
  <Icon content={icon} />
</button>
