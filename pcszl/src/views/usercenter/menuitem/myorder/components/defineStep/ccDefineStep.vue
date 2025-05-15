<template>
    <div class="step">
        <div class="step_box">
            <!-- 左侧进度线 -->
            <div class="step_left">
            </div>

            <div class="step_right">
                <div class="right_content" v-for="(item, index) in stepData" :key="index">
                    <!-- 进度名称 -->
                    <div v-if="item.isNow == 0">
                        <p class="title" :style="{ color: item.type == 1 ? '#202020' : '#999' }">{{ item.name }}</p>
                    </div>
                    <div v-if="item.isNow == 1">
                        <p class="title" :style="{ color: item.type == 1 ? colors : '#999' }">{{ item.name }}</p>
                    </div>
                    <!-- 进度时间 -->
                    <p class="times" v-if="item.type == 1">{{ item.time }}</p>
                    <!-- 进度详情备注 -->
                    <p class="result" v-if="item.desc && item.desc !== ''"><text
                            style="color: #202020;">{{ item.desc }}</text></p>
                    <!-- 右侧的进度点 -->
                    <p class="status"
                        :style="{ background: item.isNow == 1 ? colors : '#ccc', borderColor: item.isNow == 1 ? colors : '#ccc' }">
                        {{ item.isNow == 1 ? "✓" : '' }}
                    </p>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    colors: {
        type: String,
        default: '',
    },
    stepData: {
        type: Array<any>,
        default: []
    },
});
</script>

<style lang="scss" scoped>
p{
    padding: 0;
    margin: 0;
}
.step {
    padding: 15px 10px;
}

.step_box {
    margin: 0;
    display: flex;

    .step_left {
        width: 2px;
        display: block;
        background-color: #DDDDDD;
        overflow: hidden;
    }

    .step_right {
        margin-left: 30px;
        margin-top: -10px;

        .right_content {
            position: relative;
            margin-bottom: 15px;
            .title {
                font-size: 18px;
                font-family: Source Han Sans CN;
                font-weight: 500;
                color: #333333;
            }

            .times {
                font-size: 16px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #999999;
                line-height: 26px;
            }

            .status {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                border: 2px solid #ccc;
                position: absolute;
                top: 10px;
                background-color: #ccc;
                left: -36px;
                color: white;
                line-height: 12px;
                font-size: 10px;
                text-align: center;
            }

            .result {
                padding: 10px 15px;
                background-color: #F6F6F6;
                font-size: 16px;
                border: 1px dashed #ddd;
            }

            &:last-of-type {
                margin-bottom: 0;

                .status {
                    top: 14px;
                }

                &::before {
                    content: '';
                    width: 6px;
                    height: 100%;
                    background-color: #FFFFFF;
                    position: absolute;
                    top: 22px;
                    left: -24px;
                }
            }
        }
    }
}
</style>
