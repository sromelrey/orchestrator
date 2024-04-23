"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { TreeViewBaseItem } from "@mui/x-tree-view/models/items";
import { UseTreeItem2Parameters } from "@mui/x-tree-view/useTreeItem2";
import { Avatar, Checkbox } from "@mui/material";
import {
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2GroupTransition,
  TreeItem2Label,
  TreeItem2Root,
} from "@mui/x-tree-view/TreeItem2";
import { styled } from "@mui/material/styles";

import { TreeItem2Icon } from "@mui/x-tree-view/TreeItem2Icon";
import { useTreeItem2 } from "@mui/x-tree-view/useTreeItem2/useTreeItem2";
import { TreeItem2Provider } from "@mui/x-tree-view/TreeItem2Provider";

export default function TreeView({ items }: { items: TreeViewBaseItem[] }) {
  const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
    padding: theme.spacing(0.5, 1),
  }));

  interface CustomTreeItemProps
    extends Omit<UseTreeItem2Parameters, "rootRef">,
      Omit<React.HTMLAttributes<HTMLLIElement>, "onFocus"> {}
  const CustomTreeItem = React.forwardRef(function CustomTreeItem(
    props: CustomTreeItemProps,
    ref: React.Ref<HTMLLIElement>
  ) {
    const { id, itemId, label, disabled, children, ...other } = props;

    const {
      getRootProps,
      getContentProps,
      getIconContainerProps,
      getLabelProps,
      getGroupTransitionProps,
      status,
    } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });
    console.log({ props });
    return (
      <TreeItem2Provider itemId={itemId}>
        <TreeItem2Root {...getRootProps(other)}>
          <CustomTreeItemContent {...getContentProps()}>
            <TreeItem2IconContainer {...getIconContainerProps()}>
              <TreeItem2Icon status={status} />
            </TreeItem2IconContainer>
            <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
              {children && <Checkbox />}
              <TreeItem2Label {...getLabelProps()} />
            </Box>
          </CustomTreeItemContent>
          {children && (
            <TreeItem2GroupTransition {...getGroupTransitionProps()} />
          )}
        </TreeItem2Root>
      </TreeItem2Provider>
    );
  });
  return (
    <RichTreeView
      aria-label='customized'
      defaultExpandedItems={["1"]}
      items={items}
      slots={{ item: CustomTreeItem }}
    />
  );
}
