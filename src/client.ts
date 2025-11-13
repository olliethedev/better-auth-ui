import { createRoute, defineClientPlugin } from "@btst/stack/plugins/client"
import type { QueryClient } from "@tanstack/react-query"
import { lazy } from "react"
import { authViewPaths } from "./lib/view-paths"

/**
 * Configuration for auth client plugin
 */
export interface AuthClientConfig {
    siteBaseURL: string
    siteBasePath: string

    // Optional context to pass to loaders (for SSR)
    context?: Record<string, unknown>
}

// Meta generator factory for auth pages
function createAuthMeta(
    config: AuthClientConfig,
    path: string,
    title: string,
    description: string
) {
    return () => {
        const { siteBaseURL, siteBasePath } = config
        const fullUrl = `${siteBaseURL}${siteBasePath}${path}`

        return [
            { name: "title", content: title },
            { name: "description", content: description },
            { property: "og:title", content: title },
            { property: "og:description", content: description },
            { property: "og:type", content: "website" },
            { property: "og:url", content: fullUrl },
            { name: "twitter:card", content: "summary" },
            { name: "twitter:title", content: title },
            { name: "twitter:description", content: description }
        ]
    }
}

/**
 * Auth client plugin
 * Provides routes, components, and meta for authentication flows
 *
 * @param config - Configuration including queryClient and URLs
 */
export const authClientPlugin = (
    config: AuthClientConfig
): ReturnType<typeof defineClientPlugin> =>
    defineClientPlugin({
        name: "auth",
        routes: () => ({
            signIn: createRoute(`/${authViewPaths.SIGN_IN}`, () => {
                const AuthView = lazy(() =>
                    import("./components/auth/auth-view").then((m) => ({
                        default: m.AuthView
                    }))
                )

                return {
                    PageComponent: AuthView,
                    meta: createAuthMeta(
                        config,
                        `/${authViewPaths.SIGN_IN}`,
                        "Sign In",
                        "Sign in to your account"
                    )
                }
            }),
            signUp: createRoute(`/${authViewPaths.SIGN_UP}`, () => {
                const AuthView = lazy(() =>
                    import("./components/auth/auth-view").then((m) => ({
                        default: m.AuthView
                    }))
                )

                return {
                    PageComponent: AuthView,
                    meta: createAuthMeta(
                        config,
                        `/${authViewPaths.SIGN_UP}`,
                        "Sign Up",
                        "Create a new account"
                    )
                }
            }),
            forgotPassword: createRoute(
                `/${authViewPaths.FORGOT_PASSWORD}`,
                () => {
                    const AuthView = lazy(() =>
                        import("./components/auth/auth-view").then((m) => ({
                            default: m.AuthView
                        }))
                    )

                    return {
                        PageComponent: AuthView,
                        meta: createAuthMeta(
                            config,
                            `/${authViewPaths.FORGOT_PASSWORD}`,
                            "Forgot Password",
                            "Reset your password"
                        )
                    }
                }
            ),
            resetPassword: createRoute(
                `/${authViewPaths.RESET_PASSWORD}`,
                () => {
                    const AuthView = lazy(() =>
                        import("./components/auth/auth-view").then((m) => ({
                            default: m.AuthView
                        }))
                    )

                    return {
                        PageComponent: AuthView,
                        meta: createAuthMeta(
                            config,
                            `/${authViewPaths.RESET_PASSWORD}`,
                            "Reset Password",
                            "Enter your new password"
                        )
                    }
                }
            ),
            magicLink: createRoute(`/${authViewPaths.MAGIC_LINK}`, () => {
                const AuthView = lazy(() =>
                    import("./components/auth/auth-view").then((m) => ({
                        default: m.AuthView
                    }))
                )

                return {
                    PageComponent: AuthView,
                    meta: createAuthMeta(
                        config,
                        `/${authViewPaths.MAGIC_LINK}`,
                        "Magic Link",
                        "Sign in with magic link"
                    )
                }
            }),
            emailOtp: createRoute(`/${authViewPaths.EMAIL_OTP}`, () => {
                const AuthView = lazy(() =>
                    import("./components/auth/auth-view").then((m) => ({
                        default: m.AuthView
                    }))
                )

                return {
                    PageComponent: AuthView,
                    meta: createAuthMeta(
                        config,
                        `/${authViewPaths.EMAIL_OTP}`,
                        "Email Code",
                        "Sign in with email code"
                    )
                }
            }),
            twoFactor: createRoute(`/${authViewPaths.TWO_FACTOR}`, () => {
                const AuthView = lazy(() =>
                    import("./components/auth/auth-view").then((m) => ({
                        default: m.AuthView
                    }))
                )

                return {
                    PageComponent: AuthView,
                    meta: createAuthMeta(
                        config,
                        `/${authViewPaths.TWO_FACTOR}`,
                        "Two-Factor Authentication",
                        "Enter your verification code"
                    )
                }
            }),
            recoverAccount: createRoute(
                `/${authViewPaths.RECOVER_ACCOUNT}`,
                () => {
                    const AuthView = lazy(() =>
                        import("./components/auth/auth-view").then((m) => ({
                            default: m.AuthView
                        }))
                    )

                    return {
                        PageComponent: AuthView,
                        meta: createAuthMeta(
                            config,
                            `/${authViewPaths.RECOVER_ACCOUNT}`,
                            "Recover Account",
                            "Recover your account with a backup code"
                        )
                    }
                }
            ),
            callback: createRoute(`/${authViewPaths.CALLBACK}`, () => {
                const AuthCallback = lazy(() =>
                    import("./components/auth/auth-callback").then((m) => ({
                        default: m.AuthCallback
                    }))
                )

                return {
                    PageComponent: AuthCallback
                }
            }),
            signOut: createRoute(`/${authViewPaths.SIGN_OUT}`, () => {
                const SignOut = lazy(() =>
                    import("./components/auth/sign-out").then((m) => ({
                        default: m.SignOut
                    }))
                )

                return {
                    PageComponent: SignOut
                }
            }),
            acceptInvitation: createRoute(
                `/${authViewPaths.ACCEPT_INVITATION}`,
                () => {
                    const AcceptInvitationCard = lazy(() =>
                        import(
                            "./components/organization/accept-invitation-card"
                        ).then((m) => ({
                            default: m.AcceptInvitationCard
                        }))
                    )

                    return {
                        PageComponent: AcceptInvitationCard
                    }
                }
            )
        }),
        sitemap: async () => {
            // Only include public-facing auth pages in sitemap
            return [
                {
                    url: `${config.siteBaseURL}${config.siteBasePath}/${authViewPaths.SIGN_IN}`,
                    lastModified: new Date(),
                    priority: 0.8
                },
                {
                    url: `${config.siteBaseURL}${config.siteBasePath}/${authViewPaths.SIGN_UP}`,
                    lastModified: new Date(),
                    priority: 0.8
                },
                {
                    url: `${config.siteBaseURL}${config.siteBasePath}/${authViewPaths.FORGOT_PASSWORD}`,
                    lastModified: new Date(),
                    priority: 0.5
                }
            ]
        }
    })
