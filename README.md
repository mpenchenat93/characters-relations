# Characters Visualization App

This project is an Angular-based application designed to explore and visualize a network of characters and their relationships. Initially, it was built to connect to a [Baserow](https://baserow.io) instance for dynamic data fetching, but it now uses static JSON files stored in the `assets` directory for simplicity.

Live demo : [https://personnages.indexvaltorta.fr](https://personnages.indexvaltorta.fr)

## Features

- Interactive graph visualization using Vis Network.
- Explore character profiles and their relationships.
- Fully client-side application – no backend required.
- Modular and extendable to connect with other backend solutions like Baserow or [NocoDB](https://www.nocodb.com).

## Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/mpenchenat93/characters-relations.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm start
   ```
4. Open your browser and navigate to `http://localhost:4200`.

## Data Configuration

The application is configured to work out-of-the-box using static JSON files located in the `assets` folder. However, you can reconnect it to a backend like Baserow or NocoDB by modifying the service layer to fetch data dynamically.

## Customization and Restrictions

This project is open-source. However, if you wish to fork or use it, **you must remove all content related to Maria Valtorta, including the logo and references**.

Feel free to adapt the code to suit your own needs, such as:
- Connecting to a custom backend.
- Adding or modifying the dataset.
- Extending features or visualizations.

## Dependencies

The project leverages the following libraries and frameworks:
- **Angular**: Application framework.
- **PrimeNG** and **ngx-vis**: UI components and visualization tools.

Refer to the `package.json` file for the complete list of dependencies.

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m "Add your message"`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

## License

This project is licensed under an open-source license. See the `LICENSE` file for details. Please ensure compliance with the customization and restriction rules mentioned above.

---

For questions or feedback, feel free to reach out or open an issue in the repository.

Email: matthieu.penchenat@protonmail.com

## Screenshots

![Screenshot 1](https://github.com/mpenchenat93/characters-relations/blob/master/screenshots/image.png)
![Screenshot 2](https://github.com/mpenchenat93/characters-relations/blob/master/screenshots/image2.png)