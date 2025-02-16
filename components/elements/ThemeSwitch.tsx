'use client'
import { useTheme } from "@/util/useTheme"

export default function ThemeSwitch() {
	const { theme, toggleTheme } = useTheme()

	return (
		<>
			<div
				className="dark-light-switcher pe-10 pe-lg-0 pe-0 ps-md-5 ps-0 ps-lg-4 pe-lg-4 d-flex justify-content-center align-items-center icon_80"
				onClick={toggleTheme}
				style={{ cursor: "pointer" }}
			>
				<i className={`bi theme-icon ${theme === "dark" ? "ri-sun-line text-warning" : "ri-contrast-2-line text-white"}`} />
			</div>

			
		</>
	)
}
