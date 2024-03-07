import { createTheme } from "@mui/material";
import { get4k, mediaQueries } from "./utils/Helper";

const CustomTheme = createTheme({
    palette: {
        primary: {
            main: "#0E53A8",
        },
        secondary: {
            main: "#42566C",
        },
    },
    typography: {
        fontFamily: "'Arial', sans-serif",
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
    components: {
        MuiCssBaseline: {
            styleOverrides: (theme) => ({
                ':root': {
                    '--primary-color': '#0E53A8',
                    '--body-text-color': '#42566C',
                    '--border-color': '#C2CBD6',
                },
                body: {
                    color: "var(--body-text-color)",
                },
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
                        textDecoration: 'underline'
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
                '.modal_content': {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 750,
                    bgcolor: 'background.paper',
                    border: '1px solid rgba(230, 230, 230, 1)',
                    boxShadow: '0px 4px 25px 0px rgba(0, 0, 0, 0.15)',
                    borderRadius: '12px',
                    padding: '20px',
                    background: '#fff',
                },
                '.modal_content_auto_width': {
                    width: 'auto',
                    'h2': {
                        fontSize: '18px'
                    }
                },
                '.rdrCalendarWrapper ': {
                    border: '1px solid rgba(230, 230, 230, 1)',
                    borderRadius: '12px',
                }
            }),
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                },
                paragraph: {
                    fontWeight: 400,
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
        MuiButton: {
            styleOverrides: {
                root: {
                    fontStyle: "normal",
                    textTransform: "none",
                    borderRadius: "100px",
                    boxShadow: "none",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                },
            },
        },
    },
});

export default CustomTheme;