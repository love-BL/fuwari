<script lang="ts">
    import { onMount } from "svelte";

    export let lines: string[] = [];
    export let typeSpeed = 100;
    export let deleteSpeed = 50;
    export let waitTime = 2000;

    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let currentText = "";
    let isDeleting = false;
    let element: HTMLElement;
    let cursorVisible = true;

    // 如果传入的是字符串，转换成数组
    $: textLines = Array.isArray(lines) ? lines : [lines];

    function type() {
        const fullText = textLines[currentLineIndex];

        if (isDeleting) {
            currentText = fullText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            currentText = fullText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }

        let typeSpeedCurrent = typeSpeed;

        if (isDeleting) {
            typeSpeedCurrent = deleteSpeed;
        }

        if (!isDeleting && currentText === fullText) {
            // 完成输入一句话
            typeSpeedCurrent = waitTime;
            isDeleting = true;
        } else if (isDeleting && currentText === "") {
            // 完成删除，切换到下一句
            isDeleting = false;
            currentLineIndex = (currentLineIndex + 1) % textLines.length;
            typeSpeedCurrent = 500;
        }

        setTimeout(type, typeSpeedCurrent);
    }

    onMount(() => {
        if (textLines.length > 0) {
            setTimeout(type, 1000);
        }

        //光标闪烁
        const cursorInterval = setInterval(() => {
            cursorVisible = !cursorVisible;
        }, 530);

        return () => clearInterval(cursorInterval);
    });
</script>

<div
    class="typewriter-container inline-block text-neutral-400 min-h-[1.5rem] relative pr-1 whitespace-nowrap"
    bind:this={element}
>
    <span>{currentText}</span>
    <span
        class="cursor absolute top-0 -right-2"
        style:opacity={cursorVisible ? 1 : 0}>|</span
    >
</div>

<style>
    .cursor {
        color: var(--primary);
        transition: opacity 0.1s;
    }
</style>
