import { Button, ButtonProps, Typography } from "@mui/material";
import { ReactComponent as SortArrowsEmpty } from "assets/icons/sort-arrows-empty.svg";
import { ReactComponent as SortArrowsDesc } from "assets/icons/sort-arrows-desc.svg";

const allowedValues = ["asc", "desc"] as const;

export type SortOrder = typeof allowedValues[number];

export type SortSetting = { fieldName: string; order: SortOrder } | undefined;

export interface SortButtonProps {
  fieldName: string;
  value: SortSetting;
  onChange: (value: SortSetting) => void;
  sx?: ButtonProps["sx"];
}

export const SortButton: React.FC<SortButtonProps> = ({
  fieldName,
  value,
  onChange,
  sx,
  children,
}) => {
  const isCurrentSort = value?.fieldName === fieldName;

  const onClick = () => {
    if (!isCurrentSort) {
      onChange({ fieldName, order: "desc" });
    } else if (value.order === "desc") {
      onChange({ fieldName, order: "asc" });
    } else {
      onChange(undefined);
    }
  };

  return (
    <Button
      sx={{ px: 0, ...sx }}
      onClick={onClick}
      size="small"
      color="primary"
      endIcon={
        isCurrentSort ? (
          value.order === "desc" ? (
            <SortArrowsDesc style={{ transform: "scale(1.2)" }} />
          ) : (
            <SortArrowsDesc style={{ transform: "scale(-1.2)" }} />
          )
        ) : (
          <SortArrowsEmpty style={{ transform: "scale(1.2)" }} />
        )
      }
    >
      <Typography variant="body2" color="textSecondary">
        {children}
      </Typography>
    </Button>
  );
};
