import { createTheme } from "@mui/material";
import { get4k, mediaQueries } from "./utils/Helper";

const CustomTheme = createTheme({
  // palette: {
  //     primary: {
  //         main: color('var(--primary-color)'),
  //     },
  //     secondary: {
  //         main: "var(--secondary-color)",
  //     },
  //     success: {
  //         main: "#2F8D20"
  //     },
  //     text: {
  //         primary: "var(--wc-font-color)",
  //         secondary: "#43425D",
  //         success: "#2F8D20",
  //         danger: "#C72D2D",
  //         light: "#ffffff"
  //     },
  //     divider: "var(--wc-border-color)"
  // },
  typography: {
    fontFamily: "var(--wc-font-family)",
  },
  breakpoints: {
    values: {
      xs: mediaQueries.xs,
      sm: mediaQueries.sm,
      md: mediaQueries.md,
      lg: mediaQueries.lg,
      xl: mediaQueries.xl,
      xxxl: mediaQueries.xxxl,
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {
        height: 40,
        fontSize: "16px",
        width: "100%",
        borderRadius: "12px",
        border: "1px solid var(--wc-border-color)",
        color: "var(--body-text-color)",
        background: "#fff",
        "@media (min-width: 2201px)": {
          height: get4k(40),
          fontSize: get4k(16),
          borderRadius: get4k(12),
        },
      },
      nativeInput: {
        position: "absolute !important",
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-notchedOutline": {
          border: 0,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "inherit",
        },
        "&.Mui-focused": {
          borderRadius: get4k(12),
          borderColor: "var(--primary-color)",
          boxShadow: "0 0 0 2px rgba(53, 109, 173, 0.2)",
        },
      },
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {},
        paragraph: {
          fontWeight: 400,
          color: "var(--wc-font-color)",
        },
        h1: {
          fontWeight: 600,
        },
        h2: {
          fontWeight: 600,
        },
        h3: {
          fontWeight: 600,
        },
        h4: {
          fontWeight: 600,
        },
        h5: {
          fontWeight: 600,
        },
        h6: {
          fontWeight: 600,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          '& .MuiFormControlLabel-label': {
            paddingLeft: '0.75rem',
          }
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: "0",
          color: 'var(--wc-border-color)',
          '&.Mui-checked': {
            color: 'var(--primary-color)',
          },
          '& .PrivateSwitchBase-input': {
            display: 'none !important',
          }
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontStyle: "normal",
          textTransform: "none",
          lineHeight: 'normal',
          borderRadius: "100px",
          boxShadow: "none",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          padding: '0 24px',
          background: 'var(--primary-color)',
          color: '#fff',
          height: '40px',
          '&:hover': {
            background: 'var(--primary-color)',
          },
          '&.MuiButton-outlined': {
            background: 'transparent',
            color: 'var(--primary-color)',
            padding: '0 24px',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          height: 40,
          fontSize: "16px",
          width: "100%",
          borderRadius: "12px",
          border: "1px solid var(--wc-border-color)",
          color: "var(--body-text-color)",
          background: "#fff",
          "@media (min-width: 2201px)": {
            height: get4k(40),
            fontSize: get4k(16),
            borderRadius: get4k(12),
          },
        },
        nativeInput: {
          position: "absolute !important",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            border: 0,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "inherit",
          },
          "&.Mui-focused": {
            borderRadius: get4k(12),
            borderColor: "var(--primary-color)",
            boxShadow: "0 0 0 2px rgba(53, 109, 173, 0.2)",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          color: "var(--wc-font-color)",
        },
        'body.wcprop-2 section.portlet': {
          '.rdrDefinedRangesWrapper': {
            display: 'none'
          },
          '.search_wrap': {
            border: '1px solid #E6E6E6',
            boxShadow: '0px 2px 20px 0px rgba(0, 0, 0, 0.08)',
            borderRadius: '20px',
            padding: '40px'
          },
          '.label_group': {
            paddingRight: '15px',
            marginBottom: '4px',
            button: {
              padding: 0,
              color: 'var(--primary-color)',
              textDecoration: 'underline',
              background: 'transparent!important',
              height: 'auto',
            },
            label: {
              margin: 0,
            },
            svg: {
              fontSize: '18px',
              marginRight: '8px'
            },
          },
          '.customInputBox': {
            display: 'flex',
            alignItems: 'center',
            height: '56px',
            border: '1px solid rgba(203, 203, 203, 1)',
            boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.05)',
            borderRadius: '100px',
            padding: '0 15px',
            cursor: 'pointer',
            position: 'relative',
            userSelect: 'none',
            'div': {
              display: 'inline-flex',
              alignItems: 'center',
              flex: '1',
              'svg': {
                fontSize: '18px',
                color: 'var(--primary-color)',
              },
              'span': {
                paddingLeft: '10px'
              }
            }
          },
          '.customInputBoxCal': {
            'div:last-of-type': {
              position: 'relative',
              paddingLeft: '20px',
              '&:before': {
                content: "''",
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: "0",
                width: "1px",
                height: "80%",
                background: "var(--wc-border-color)"
              }
            }
          },
          '.search_btn_wrap': {
            position: 'relative',
            paddingLeft: '40px',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              left: '10px',
              height: '80%',
              width: '1px',
              background: 'rgba(203, 203, 203, 1)',
            },
            'button': {
              background: 'var(--primary-color)',
              color: '#fff',
              fontSize: '18px',
              height: '56px',
              borderRadius: '100px',
              padding: '0 30px',
              display: 'inline-flex',
              alignItems: 'center',
              'svg': {
                marginLeft: '10px'
              },
              '&:hover': {
                background: 'var(--primary-color)'
              }
            }

          },
          '.custom_input_outer': {
            position: 'relative',
          },
          '.inline_modal': {
            position: 'absolute',
            top: '100%',
            left: '0',
            marginTop: '8px',
            border: '1px solid var(--wc-border-color)',
            boxShadow: '0px 4px 25px 0px rgba(0, 0, 0, 0.15)',
            borderRadius: '12px',
            background: '#fff',
            zIndex: 9,
            'h2': {
              fontSize: '18px',
              padding: '15px',
              lineHeight: 'normal',
              margin: 0,
            },
          },
          '.inline_modal_body': {
            margin: '0 15px'
          },
          '.inline_modal_footer': {
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '15px',
            marginTop: '15px',
            borderTop: '1px solid var(--wc-border-color)',
            gap: 10,
            'button': {
              'svg': {
                fontSize: 20,
                marginRight: 10
              },
            },
          },
          //Customize Calendar
          '.rdrCalendarWrapper ': {
            border: '1px solid var(--wc-border-color)',
            borderRadius: '12px',
            background: 'var(--body-bg)',
            '.rdrDayToday .rdrDayNumber span:after': {
              display: 'none',
            },
            '.rdrMonthAndYearPickers': {
              display: 'none'
            },
            '.rdrMonthAndYearWrapper': {
              borderBottom: '1px solid var(--wc-border-color)',
              paddingTop: 0,
              height: '56px',
              position: "relative",
              zIndex: 9
            },
            '.rdrMonths': {
              width: '650px',
              maxWidth: '100%'
            },
            '.rdrMonth': {
              position: 'relative',
              padding: '10px 0',
              flex: '1',
              '&:first-of-type': {
                paddingRight: '10px'
              },
              '&:last-of-type': {
                paddingLeft: '10px'
              },
            },
            '.rdrMonthName': {
              textAlign: 'center',
              position: 'absolute',
              width: '100%',
              top: '-45px',
              color: 'inherit'
            },
          },
          //Add Room Card
          '.add_room_card': {
            background: 'var(--body-bg)',
            marginTop: '15px',
            borderRadius: '12px',
            border: '1px solid var(--wc-border-color)',
            width: '500px',
            maxWidth: '100%',
            userSelect: 'none',
            '.room_card_header': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--wc-border-color)',
              marginBottom: '15px',
              'button': {
                background: 'transparent',
                height: 'auto',
                color: 'var(--primary-color)',
                textDecoration: 'underline',
              }
            },
            '.room_row': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '5px 15px 15px',
              lineHeight: 'normal',
              'small': {
                fontSize: '80%',
                color: '#898989',
              },
              '.room_counter': {
                display: 'flex',
                alignItems: 'center',
              },
              'button': {
                padding: 0,
                minWidth: 32,
                height: 32,
                color: 'var(--body-text-color)',
                borderColor: 'var(--wc-border-color)',
                '&.disabled': {
                  opacity: 0.4,
                  pointerEvents: 'none',
                },
                'svg': {
                  fontSize: 20
                },
              },
              'span': {
                padding: '0 10px',
                '&.required': {
                  padding: 0,
                  color: '#C72D2D'
                }
              },
            },
            '.child_age_row': {
              '& > div': {
                width: '100%',
              },
              'p': {
                fontSize: 14
              }
            },
          },
          '.add_room_btn': {
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '15px 15px 0 15px',
          },
        }
      }),
    },
  },
});

export default CustomTheme;
