<script lang="ts">
  export let activeButtons: string[];
  export let disabled: boolean;
  export let key: string;
  export let action: Function;
  export let icon: string;

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
  on:click={handleClick}
>
  {@html icon}
</button>
