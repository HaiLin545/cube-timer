import { getByteLength, cutStrByByte } from "../../../utils/util";

// @ts-ignore
const app = getApp<IAppOption>();

const MAX_GROUP_NAME_LENGTH = 16;

Component({
    properties: {
        currentGroup: String,
        groupList: Array,
    },
    data: {
        title: "选择一个分组",
        isShowConfirmPopper: false,
        isShowEditPopper: false,
        isNewGroup: false,
        deleteGroupName: "",
        deleteGroupIndex: 0,
        updateGroupIndex: 0,
        newGroupName: "",
        groupNameWordNum: 0,
    },
    observers: {
        newGroupName: function (newName) {
            this.setData({
                groupNameWordNum: getByteLength(newName),
            });
        },
    },
    methods: {
        onClickWrapper() {
            this.triggerEvent("closePopper");
        },
        onClickPopper() {},
        onCancel() {
            this.triggerEvent("closePopper");
        },
        onTapUpdateGroupName(e: WechatMiniprogram.TouchEvent) {
            const { item, index } = e.currentTarget.dataset;
            this.setData({
                newGroupName: item,
                updateGroupIndex: index,
                isShowEditPopper: true,
                isNewGroup: false,
            });
        },
        onTapDeleteGroup(e: WechatMiniprogram.TouchEvent) {
            this.setData({
                isShowConfirmPopper: true,
                deleteGroupName: e.currentTarget.dataset.item,
                deleteGroupIndex: e.currentTarget.dataset.index,
            });
        },
        onCancelDeleteGroup() {
            this.setData({
                isShowConfirmPopper: false,
            });
        },
        onDeleteGroup() {
            console.log("on delete group", app.groups.length);
            if (app.groups.length == 1) {
                this.triggerEvent("alertDeleteGroup", {
                    callback: () => {
                        this.setData({
                            isShowConfirmPopper: false,
                        });
                    },
                });
                return;
            }
            const detail = {
                groupName: this.data.deleteGroupName,
                groupIndex: this.data.deleteGroupIndex,
                callback: () => {
                    this.setData({
                        isShowConfirmPopper: false,
                    });
                },
            };
            this.triggerEvent("deleteGroup", detail);
        },
        onTapChangeGroup(e: WechatMiniprogram.TouchEvent) {
            const detail = {
                ...e.currentTarget.dataset,
                callback: () => {},
            };
            this.triggerEvent("changeGroup", detail);
        },
        onClickAddGroup() {
            this.setData({
                newGroupName: "",
                isShowEditPopper: true,
                isNewGroup: true,
            });
        },
        onCancelEditGroup() {
            this.setData({
                isShowEditPopper: false,
            });
        },
        onEditGroup() {
            if (this.data.newGroupName.length > 0) {
                if (this.data.isNewGroup) {
                    console.log("trigger addGroup");
                    this.triggerEvent("addGroup", {
                        newGroupName: this.data.newGroupName,
                        callback: () => {
                            this.setData({
                                isShowEditPopper: false,
                            });
                        },
                    });
                } else {
                    console.log("trigger updateGroup");
                    this.triggerEvent("updateGroup", {
                        index: this.data.updateGroupIndex,
                        newGroupName: this.data.newGroupName,
                        callback: () => {
                            this.setData({
                                isShowEditPopper: false,
                            });
                        },
                    });
                }
            }
        },
        onInputGroupName(e: WechatMiniprogram.Input) {
            const value = e.detail.value;
            const len = getByteLength(value);
            if (len > MAX_GROUP_NAME_LENGTH) {
                const newName = cutStrByByte(value, MAX_GROUP_NAME_LENGTH);
                this.setData({
                    newGroupName: newName,
                });
            }
        },
    },
});
