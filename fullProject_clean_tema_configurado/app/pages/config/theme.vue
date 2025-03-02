<template>
    <div>
        <h1>Teste</h1>
        <hr>
        <!-- flex com 2 colunas usando tailwind  v3-->
        <div class="flex flex-col md:flex-row w-full">
            <div class="w-full md:w-1/2">
                <ThemeCustomizerSelector/>
            </div>
            <div class="w-full md:w-1/2">
                <ThemeCustomizerDebugger/>
            </div>
        </div>
        <!-- coluna 1 -->
        <!-- coluna 2 -->

    </div>
</template>
